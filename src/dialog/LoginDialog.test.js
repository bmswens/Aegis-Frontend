// testing help
import { act, render, screen } from "@testing-library/react"
import  * as oidc  from 'react-oidc-context'
import userEvent from "@testing-library/user-event"

// to test
import LoginDialog from "./LoginDialog"

const authObject = {
    signinRedirect: jest.fn()
}

jest.mock('react-oidc-context')

describe('<LoginDialog>', function() {
    it("should be able to close without auth", async function() {
        let user = userEvent.setup()
        const close = jest.fn()
        oidc.useAuth.mockReturnValue(authObject)
        render(
            <LoginDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(button))
        expect(close).toHaveBeenCalled()
    })
    it("should be able to activate login", async function() {
        let user = userEvent.setup()
        const close = jest.fn()
        oidc.useAuth.mockReturnValue(authObject)
        render(
            <LoginDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Sign In / Sign Up" })
        await act(() => user.click(button))
        expect(authObject.signinRedirect).toHaveBeenCalled()
    })
})