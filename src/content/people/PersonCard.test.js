// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

// to test
import PersonCard from './PersonCard'

describe('<PersonCard>', function() {
    it("should display the name of the person", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    firstName="John"
                    lastName="Doe"
                />
            </BrowserRouter>
        )
        let actual = screen.getByText("John Doe")
        expect(actual).not.toBeNull()
    })
    it("should display the title of the person", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    title="App Dev"
                />
            </BrowserRouter>
        )
        let actual = screen.getByText("App Dev")
        expect(actual).not.toBeNull()
    })
    it("should have a button for viewing location", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    address="317 W. 3rd St, Beaver Dam, WI"
                />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "View Address"})
        expect(actual).not.toBeNull()
    })
    it("should have a button to send an email", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    title="App Dev"
                />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Send Email"})
        expect(actual).not.toBeNull()
    })
    it("should have a button to send SMS", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    title="App Dev"
                />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Send Text"})
        expect(actual).not.toBeNull()
    })
    it("should have a button to call", function() {
        render(
            <BrowserRouter>
                <PersonCard
                    title="App Dev"
                />
            </BrowserRouter>
        )
        let actual = screen.getByRole("button", { name: "Call"})
        expect(actual).not.toBeNull()
    })
    it("should open and close the more info dialog", async function() {
        let user = userEvent.setup()
        render(
            <BrowserRouter>
                <PersonCard />
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
})