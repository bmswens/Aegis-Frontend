// testing help
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import api from '../api'
import { makeFakePerson } from '../api/demo/people'

// to test
import PersonDialog from './PersonDialog'

describe('<PersonDialog> new person mode', function() {
    it("should close without submitting", async function() {
        let close = jest.fn()
        let user = userEvent.setup()
        
        render(
            <PersonDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Cancel" })
        await act(() => user.click(button)) 
        expect(close).toHaveBeenCalled()
    })
    it("should be able to submit a new person", async function() {
        let expectedPerson = {
            id: null,
            firstName: "John",
            lastName: "Doe",
            title: "User",
            address: "Location",
            email: "email@mail.com",
            phone: "911",
            supervisor: "supervisor id",
            team: "team id"
        }
        let user = userEvent.setup()
        let spy = jest.spyOn(api.people, "addPerson")
        // mock dat api
        api.people.getShortPeople = jest.fn().mockResolvedValue([
            {
                name: "Brandon Swenson",
                id: "supervisor id"
            }
        ])
        api.org.getShortOrgs = jest.fn().mockResolvedValue([
            {
                name: "Dev Team",
                id: "team id"
            }
        ])
        render(
            <PersonDialog
                open={true}
                close={jest.fn()}
            />
        )
        // a lot of data entry
        let data = [
            {
                label: "First Name",
                data: expectedPerson.firstName
            },
            {
                label: "Last Name",
                data: expectedPerson.lastName
            },
            {
                label: "Title",
                data: expectedPerson.title
            },
            {
                label: "Address",
                data: expectedPerson.address
            },
            {
                label: "Email",
                data: expectedPerson.email
            },
            {
                label: "Phone",
                data: expectedPerson.phone
            }
        ]
        for (let entry of data) {
            let textBox = screen.getByLabelText(entry.label)
            await act(async () => await user.type(textBox, entry.data))
        }
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Dev Team")
        await act(() => user.click(org))
        let superivsorBox = screen.getByLabelText("Supervisor")
        await act(() => user.click(superivsorBox))
        let supervisor = screen.getByText("Brandon Swenson")
        await act(() => user.click(supervisor))
        let submitButton = screen.getByRole("button", { name: "Submit" })
        await act(async () => await user.click(submitButton))
        // test the output
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(expectedPerson)
        })
    })
})

describe("<PersonDialog> edit mode", function() {
    it("should be able to update a person", async function() {
        let expectedPerson = {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            title: "User",
            address: "Location",
            email: "email@mail.com",
            phone: "911",
            supervisor: "supervisor id",
            team: "team id"
        }
        let user = userEvent.setup()
        let spy = jest.spyOn(api.people, "updatePerson")
        // mock dat api
        api.people.getShortPeople = jest.fn().mockResolvedValue([
            {
                name: "Brandon Swenson",
                id: "supervisor id"
            }
        ])
        api.org.getShortOrgs = jest.fn().mockResolvedValue([
            {
                name: "Dev Team",
                id: "team id"
            }
        ])
        render(
            <PersonDialog
                person={{
                    ...expectedPerson,
                    firstName: "Jon",
                    supervisor: {
                        name: "Brandon Swenson",
                        id: "supervisor id"
                    },
                    team: {
                        name: "Dev Team",
                        id: "team id"
                    }
                }}
                open={true}
                close={jest.fn()}
            />
        )
        // a lot of data entry
        let data = [
            {
                label: "First Name",
                data: expectedPerson.firstName
            }
        ]
        for (let entry of data) {
            let textBox = screen.getByLabelText(entry.label)
            await act(async () => await user.clear(textBox))
            await act(async () => await user.type(textBox, entry.data))
        }
        let submitButton = screen.getByRole("button", { name: "Submit" })
        await act(async () => await user.click(submitButton))
        // test the output
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith(expectedPerson)
        })
    })
})

describe("<PersonDialog> view mode", function() {
    it("shouldn't have a submit button", async function() {
        let fakePerson = makeFakePerson()
        fakePerson.team = null
        fakePerson.superivsor = null
        api.org.getShortOrgs = jest.fn().mockResolvedValue([])
        api.people.getShortPeople = jest.fn().mockResolvedValue([])
        render(
            <PersonDialog
                open={true}
                close={jest.fn()}
                viewOnly
                person={fakePerson}
            />
        )
        await waitFor(() => {
            expect(api.org.getShortOrgs).toHaveBeenCalled()
            expect(api.people.getShortPeople).toHaveBeenCalled()
        })
        let button = screen.queryByRole("button", { name: "Submit" })
        expect(button).toBeNull()
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(() => userEvent.click(closeButton))
    })
})