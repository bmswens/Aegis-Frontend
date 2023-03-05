// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// to test
import TeamCard from './TeamCard'

describe('<TeamCard>', function() {
    it('should display the team name', function() {
        let expected = "Dev Team"
        render(
            <BrowserRouter>
                <TeamCard
                    name={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByText(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the number of members", function() {
        let expected = 14
        render(
            <BrowserRouter>
                <TeamCard
                    memberCount={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByText(expected)
        expect(actual).not.toBeNull()
    })
    it("should be able to open the more info dialog", function() {
        // TODO: Implement later
    })
    it("should disable buttons (map) for unprovided info", function() {
        render(
            <BrowserRouter>
                <TeamCard
                    phone={"123"}
                    email={"team@gmail.com"}
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "View Address"})
        expect(button.disabled).toBeTruthy()
    })
    it("should disable buttons (email) for unprovided info", function() {
        render(
            <BrowserRouter>
                <TeamCard
                    phone={"123"}
                    address="place"
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Send Email"})
        expect(button.disabled).toBeTruthy()
    })
    it("should disable buttons (phone) for unprovided info", function() {
        render(
            <BrowserRouter>
                <TeamCard
                    email={"team@gmail.com"}
                />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Call"})
        expect(button.disabled).toBeTruthy()
    })
    it("should open the info dialog", async function() {
        let user = userEvent.setup()
        render(
            <BrowserRouter>
                <TeamCard />
            </BrowserRouter>
        )
        let open = screen.getByRole("button", { name: "More Info" })
        await act(() => user.click(open))
        let dialog = screen.getByRole("dialog")
        expect(dialog).not.toBeNull()
        let close = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(close))
        await waitFor(() => {
            let dialog2 = screen.queryByRole("dialog")
            expect(dialog2).toBeNull()
        })
    })
    it("should hide the link to more details if turned off", function() {
        render(
            <BrowserRouter>
                <TeamCard
                    noLink
                />
            </BrowserRouter>
        )
        let button = screen.queryByRole("button", { name: "Details" })
        expect(button).toBeNull()
    })
})