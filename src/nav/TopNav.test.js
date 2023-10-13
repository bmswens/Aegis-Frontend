// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import * as oidc from 'react-oidc-context'
import { UserContextProvider } from '../context/UserContext'

// to test
import TopNav from './TopNav'

const authObject = {
    signinRedirect: jest.fn()
}

jest.mock('react-oidc-context')

describe('<TopNav>', function () {
    it("should have a home button", function () {
        oidc.useAuth.mockReturnValue(authObject)
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Home" })
        expect(actual).not.toBeNull()
    })
    it('should open the user dialog on click and be able to close', async function () {
        const user = userEvent.setup()
        oidc.useAuth.mockReturnValue(authObject)
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let profileButton = screen.getByRole("button", { name: "Account" })
        await act(() => user.click(profileButton))
        let profileDialog = screen.getByRole("dialog", { name: "Authentication Options" })
        expect(profileDialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(closeButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
    it("should open account info if auth", async function() {
        const user = userEvent.setup()
        oidc.useAuth.mockReturnValue({...authObject, isAuthenticated: true, user: {access_token: ""}})
        fetch = jest.fn().mockResolvedValue({json: async () => {return {email: "x"}}})
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let profileButton = screen.getByRole("button", { name: "Account" })
        await act(() => user.click(profileButton))
        let profileDialog = screen.getByRole("dialog", { name: "Account Info" })
        expect(profileDialog).not.toBeNull()
    })
})