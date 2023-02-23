// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { UserContextProvider } from '../context/UserContext'

// to test
import TopNav from './TopNav'

describe('<TopNav>', function() {
    it('should open the user dialog on click and be able to close', async function() {
        const user = userEvent.setup()
        render(
            <UserContextProvider>
                <TopNav />
            </UserContextProvider>
        )
        let profileButton = screen.getByRole("button", { name: "User Profile"})
        await act(() => user.click(profileButton))
        let profileDialog = screen.getByRole("dialog", { name: "User Settings"})
        expect(profileDialog).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(closeButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
    it("doesn't do much... yet", function() {
        render(
            <TopNav />
        )
    })
})