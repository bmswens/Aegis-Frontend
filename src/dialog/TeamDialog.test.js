// testing help
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserContext from '../context/UserContext'
import { demoUser } from '../context/UserContext'
import api from '../api'

// to test
import TeamDialog from './TeamDialog'

describe('<TeamDialog> new team mode', function () {
    it("should be able to cancel without submitting", async function () {
        let close = jest.fn()
        let user = userEvent.setup()
        render(
            <TeamDialog
                open={true}
                close={close}
            />
        )
        let cancelButton = screen.getByRole("button", { name: "Cancel" })
        await act(async () => await user.click(cancelButton))
        expect(close).toHaveBeenCalled()
    })
    it("should be able to create a new team", async function () {
        let expectedTeam = {
            id: null,
            name: "Dev Team",
            address: "The Moon",
            email: "dev@gmail.com",
            phone: "911"
        }
        let user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => {}})
        render(
            <TeamDialog
                open={true}
                close={jest.fn()}
            />
        )
        // a lot of data entry
        let data = [
            {
                label: "Name",
                data: expectedTeam.name
            },
            {
                label: "Address",
                data: expectedTeam.address
            },
            {
                label: "Email",
                data: expectedTeam.email
            },
            {
                label: "Phone",
                data: expectedTeam.phone
            }
        ]
        for (let entry of data) {
            let textBox = screen.getByLabelText(entry.label)
            await act(async () => await user.type(textBox, entry.data))
        }
        let submitButton = screen.getByRole("button", { name: "Submit" })
        await act(async () => await user.click(submitButton))
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("/api/teams/create", {
                method: "POST",
                headers: {
                    authorization: "Bearer "
                },
                body: JSON.stringify(expectedTeam)
            })
        })
    })
})

describe("<TeamDialog> edit mode", function () {
    it("should allow the user to edit the team info", async function () {
        let startTeam = {
            id: 1,
            name: "Dev Team",
            address: "The Moon",
            email: "dev@gmail.com",
            phone: "911"
        }
        let expectedTeam = {
            ...startTeam,
            phone: "119"
        }
        let user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => {}})
        render(
            <TeamDialog
                team={startTeam}
                open={true}
                close={jest.fn()}
            />
        )
        let textBox = screen.getByLabelText("Phone")
        await act(() => user.clear(textBox))
        await act(async () => await user.type(textBox, "119"))
        let submitButton = screen.getByRole("button", { name: "Submit" })
        await act(async () => await user.click(submitButton))
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith("/api/teams/1", {
                method: "PUT",
                headers: {
                    authorization: "Bearer "
                },
                body: JSON.stringify(expectedTeam)
            })
        })
    })
})