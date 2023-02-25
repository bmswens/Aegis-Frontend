// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from '../context/UserContext'

// to test
import TopNav from './TopNav'

describe('<TopNav>', function() {
    it("should have a home button", function() {
        render(
            <BrowserRouter>
                <TopNav />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Home"})
        expect(actual).not.toBeNull()
    })
    it('should open the user dialog on click and be able to close', async function() {
        const user = userEvent.setup()
        render(
            <BrowserRouter>
                <UserContextProvider>
                    <TopNav />
                </UserContextProvider>
            </BrowserRouter>
        )
        let profileButton = screen.getByRole("button", { name: "User Profile"})
        await act(() => user.click(profileButton))
        let profileDialog = screen.getByRole("dialog", { name: "User Settings"})
        expect(profileDialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Cancel" })
        await act(() => user.click(closeButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
})