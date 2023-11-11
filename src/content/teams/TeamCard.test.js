// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'
import UserContext, { demoUser, UserContextProvider } from '../../context/UserContext'
import  * as oidc  from 'react-oidc-context'

// to test
import TeamCard from './TeamCard'

// jest mock
jest.mock('react-oidc-context')
const defaultAccountInfo = {
    firstName: "",
    lastName: "",
    email: "bmswens@gmail.com",
    phone: "",
    title: "",
    address: "",
    lastUpdated: ""
}


describe('<TeamCard>', function() {
    beforeEach(() => {
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        fetch = jest.fn().mockResolvedValueOnce({json: async () => defaultAccountInfo})
    })
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
    it("should display a checkmark icon for members", async function() {
        fetch = jest.fn().mockResolvedValue({json: () => { return {status: "member" } }})
        render(
            <UserContextProvider>
                <BrowserRouter>
                    <TeamCard 
                        id={1}
                    />
                </BrowserRouter>
            </UserContextProvider>
        )
        await waitFor(() => {
            let icon = screen.getByTestId("Member")
            expect(icon).not.toBeNull()
        })
    })
    it("should display a star for admin", async function() {
        fetch = jest.fn().mockResolvedValue({json: () => { return {status: "admin" } }})
        render(
            <UserContextProvider>
                <BrowserRouter>
                    <TeamCard 
                        id={1}
                    />
                </BrowserRouter>
            </UserContextProvider>
        )
        await waitFor(() => {
            let icon = screen.getByTestId("Admin")
            expect(icon).not.toBeNull()
        })
    })
})

describe("<TeamCard> as admin", function() {
    beforeEach(() => {
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        fetch = jest.fn().mockResolvedValueOnce({json: async () => defaultAccountInfo})
    })
    it("should contain the edit modal", async function() {
        fetch = jest.fn().mockResolvedValue({json: () => { return {status: "admin" } }})
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
        let editButton
        await waitFor(() => {
            editButton = screen.getByRole("button", { name: "Edit Team"})
        })
        await act(() => user.click(editButton))
        let cancelButton = screen.getByRole("button", {name: "Cancel"})
        await act(() => user.click(cancelButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
    it("should allow the admin to delete the team", async function() {
        fetch = jest.fn().mockResolvedValue({json: () => { return {status: "admin" } }})
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
        fetch = jest.fn().mockResolvedValue({ok: true})
        let deleteButton
        await waitFor(() => {
            deleteButton = screen.getByRole("button", { name: "Delete Team"})
        })
        await act(() => user.click(deleteButton))
        let confirmButton = screen.getByRole("button", {name: "Confirm"})
        await act(() => user.click(confirmButton))
        expect(fetch).toHaveBeenCalledWith("/api/teams/1", {
            method: "DELETE",
            headers: {
                authorization: "Bearer "
            }
        })
    })
})

describe("<TeamCard> as non-admin", function() {
    beforeEach(() => {
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        fetch = jest.fn().mockResolvedValueOnce({json: async () => defaultAccountInfo})
    })
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

describe("<TeamCard> as non-member", function() {
    beforeEach(() => {
        let authObject = {
            isAuthenticated: true,
            signoutSilent: jest.fn(),
            user: {
                access_token: ""
            }
        }
        oidc.useAuth.mockReturnValue(authObject)
        fetch = jest.fn().mockResolvedValueOnce({json: async () => defaultAccountInfo})
    })
    it("should allow the user to request to join a team", async function() {
        let user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: () => { return {status: "none" } }})
        render(
            <UserContext.Provider value={{...demoUser}}>
                <BrowserRouter>
                    <TeamCard
                        id={1}
                    />
                </BrowserRouter>
            </UserContext.Provider>
        )
        let button = screen.getByRole("button", { name: "Join Team" })
        await act(() => user.click(button))
        let confirmButton = screen.getByRole("button", { name: "Confirm"})
        await act(() => user.click(confirmButton))
        await waitFor(() => {
            expect(fetch).toHaveBeenLastCalledWith(
                `/api/teams/1/join`,
                {
                    method: "POST",
                    headers: {
                        authorization: `Bearer `,
                        "Content-Type": "application/json"
                    }
                }
            )
        })
    })
})