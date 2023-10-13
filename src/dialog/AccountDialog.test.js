// test help
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import  * as oidc  from 'react-oidc-context'

// to test
import AccountDialog from "./AccountDialog"

// jest mock
jest.mock('react-oidc-context')

const defaultAccountInfo = {
    firstName: "",
    lastName: "",
    email: "bmswens@gmail.com",
    phone: "",
    title: "",
    address: "",
    lastUpdated: ""
}

describe('<AccountDialog>', function() {
    it("should be able to logout", async function() {
        let user = userEvent.setup()
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        let close = jest.fn()
        fetch = jest.fn().mockResolvedValue({json: async () => defaultAccountInfo})
        render(
            <AccountDialog
                open={true}
                close={close}
            />
        )
        await waitFor(() => {
            let dialog = screen.getByRole('dialog')
            expect(dialog).not.toBeNull()
        })
        let button = screen.getByRole("button", { name: "Logout" })
        await act(() => user.click(button))
        expect(authObject.signoutSilent).toHaveBeenCalled()
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update fields", async function() {
        let user = userEvent.setup()
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: "token"
            }
        }
        let expectedData = {
            firstName: "Brandon",
            lastName: "Swenson",
            title: "Lead Developer",
            phone: "911",
            address: "Nonya"
        }
        oidc.useAuth.mockReturnValue(authObject)
        let close = jest.fn()
        fetch = jest.fn().mockResolvedValue({json: async () => defaultAccountInfo})
        render(
            <AccountDialog
                open={true}
                close={close}
            />
        )
        await waitFor(() => {
            let dialog = screen.getByRole('dialog')
            expect(dialog).not.toBeNull()
        })
        // a lot of data entry
        let data = [
            {
                label: "First Name",
                data: expectedData.firstName
            },
            {
                label: "Last Name",
                data: expectedData.firstName
            },
            {
                label: "Title",
                data: expectedData.title
            },
            {
                label: "Phone",
                data: expectedData.phone
            },
            {
                label: "Address",
                data: expectedData.address
            }
        ]
        for (let entry of data) {
            let textBox = screen.getByLabelText(entry.label)
            await act(async () => await user.type(textBox, entry.data))
        }
        let button = screen.getByRole("button", { name: "Update" })
        await act(() => user.click(button))
        expect(fetch).toHaveBeenCalledTimes(2)
    })
    it("shouldn't load if not authenticated", function() {
        let authObject = {
            isAuthenticated: false,
            signoutSilent: jest.fn(),
            user: {
                token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        let close = jest.fn()
        fetch = jest.fn().mockResolvedValue({json: async () => defaultAccountInfo})
        render(
            <AccountDialog
                open={true}
                close={close}
            />
        )
        let dialog = screen.queryByRole("dialog")
        expect(dialog).toBeNull()
    })
})