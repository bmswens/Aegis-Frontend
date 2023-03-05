// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// to test
import TeamQuickInfoDialog from './TeamQuickInfoDialog'

describe('<TeamQuickInfoDialog>', function() {
    it("should allow the user to close it", async function() {
        const user = userEvent.setup()
        const close = jest.fn()
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={close}
                />
            </BrowserRouter>
        )
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(async () => await user.click(closeButton))
        expect(close).toHaveBeenCalled()
    })
    it("should display the team's name", function() {
        let expected = "Dev Team"
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={jest.fn()}
                    name={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the team's address", function() {
        let expected = "The Moon"
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={jest.fn()}
                    address={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the team's email", function() {
        let expected = "dev@gmail.com"
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={jest.fn()}
                    email={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the team's phone", function() {
        let expected = "911"
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={jest.fn()}
                    phone={expected}
                />
            </BrowserRouter>
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the team's admins", function() {
        let admins = [
            {
                name: "Brandon Swenson",
                id: 0
            },
            {
                name: "Bruce Wayne",
                id: 1
            }
        ]
        render(
            <BrowserRouter>
                <TeamQuickInfoDialog
                    open={true}
                    close={jest.fn()}
                    admins={admins}
                />
            </BrowserRouter>
        )
        for (let admin of admins) {
            let actual = screen.getByText(admin.name)
            expect(actual).not.toBeNull()
        }
    })
})