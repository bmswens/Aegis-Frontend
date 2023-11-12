// test help
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// jest mock
import  * as oidc  from 'react-oidc-context'
import RecallButton from "./RecallButton"
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

describe('<RecallButton>', function() {
    beforeEach(() => {
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        fetch = jest.fn().mockResolvedValueOnce({json: async () => defaultAccountInfo})
    })
    it("should allow an admin to start a recall", async function() {
        fetch = jest.fn().mockResolvedValueOnce({ok: true})
        render(
            <RecallButton
                id={1}
                name="Dev Team"
            />
        )
        let user = userEvent.setup()
        let openButton = screen.getByRole("button", { name: "Start A Recall"})
        await act(() => user.click(openButton))
        let titleInput = screen.getByLabelText("Recall Title")
        await act(async () => await user.type(titleInput, "Dev Recall"))
        let messageInput = screen.getByLabelText("Recall Message")
        await act(async () => await user.type(messageInput, "You are hereby recalled!"))
        let submitButton = screen.getByRole("button", { name: "Submit" })
        await act(() => user.click(submitButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
})