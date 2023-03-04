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
})