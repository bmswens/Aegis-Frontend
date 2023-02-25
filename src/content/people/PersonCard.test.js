// testing help
import { screen, render } from '@testing-library/react'
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
})