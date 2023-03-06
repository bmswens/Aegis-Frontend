// testing help
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import api from '../api'

// to test
import NewPersonDialog from './NewPersonDialog'

describe('<NewPersonDialog>', function() {
    it("should close without submitting", async function() {
        let close = jest.fn()
        let user = userEvent.setup()
        render(
            <NewPersonDialog
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
            <NewPersonDialog
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