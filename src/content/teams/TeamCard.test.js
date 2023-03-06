// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'
import UserContext, { demoUser, UserContextProvider } from '../../context/UserContext'

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

describe("<TeamCard> as admin", function() {
    it("should contain the edit modal", async function() {
        let user = userEvent.setup()
        render(
            <UserContextProvider>
                <BrowserRouter>
                    <TeamCard 
                        id={1}
                    />
                </BrowserRouter>
            </UserContextProvider>
        )
        let editButton = screen.getByRole("button", { name: "Edit Team"})
        await act(() => user.click(editButton))
        let cancelButton = screen.getByRole("button", {name: "Cancel"})
        await act(() => user.click(cancelButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
    it("should allow the admin to delete the team", async function() {
        let user = userEvent.setup()
        let spy = jest.spyOn(api.org, "deleteTeam")
        render(
            <UserContextProvider>
                <BrowserRouter>
                    <TeamCard 
                        id={1}
                    />
                </BrowserRouter>
            </UserContextProvider>
        )
        let deleteButton = screen.getByRole("button", { name: "Delete Team"})
        await act(() => user.click(deleteButton))
        let confirmButton = screen.getByRole("button", {name: "Confirm"})
        await act(() => user.click(confirmButton))
        expect(spy).toHaveBeenCalledWith(1)
    })
})

describe("<TeamCard> as non-admin", function() {
    it("should not have the delete or edit buttons", function() {
        render(
            <UserContext.Provider value={{...demoUser, admin: false}}>
                <BrowserRouter>
                    <TeamCard />
                </BrowserRouter>
            </UserContext.Provider>
        )
        let editButton = screen.queryByRole("button", { name: "Edit Team"})
        expect(editButton).toBeNull()
        let deleteButton = screen.queryByRole("button", { name: "Delete Team"})
        expect(deleteButton).toBeNull()
    })
})