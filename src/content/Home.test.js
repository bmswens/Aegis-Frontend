// testing help
import { screen, render, act } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// to test
import Home from './Home'

describe("<Home>", function() {
    it('should have a button to nav to organizations', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Organizations"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to org charts of orgs', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Add Person"})
        expect(button).not.toBeNull()
    })
    it('should have a button to create a new org', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Add Org"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to people', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "People"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to org charts of people', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Org Charts"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to recalls', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Recalls"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to more info', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "More Info"})
        expect(button).not.toBeNull()
    })
    it('should have a button to nav to github', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "View Code"})
        expect(button).not.toBeNull()
    })
    it('should have a button to open settings', function() {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        )
        let button = screen.getByRole("button", { name: "Settings"})
        expect(button).not.toBeNull()
    })
})