// test help
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// to test

import PendingMembersButton from "./PendingMembersButton"


// jest mock
import  * as oidc  from 'react-oidc-context'
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

describe("<PendingMemberButton>", function() {
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
    it("should display 'all caught up' message if empty", async function() {
        fetch = jest.fn().mockResolvedValueOnce({json: () => []})
        let user = userEvent.setup()
        render(
            <PendingMembersButton
                id={1}
                name="Dev Team"
            />
        )
        let openButton = screen.getByRole("button", { name: "Approve New Members"})
        await act(() => user.click(openButton))
        let text = screen.getByText("You're all caught up!")
        expect(text).not.toBeNull()
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(closeButton))
        await waitFor(() => {
            let dialog = screen.queryByRole("dialog")
            expect(dialog).toBeNull()
        })
    })
    it("should allow an admin to approve a user", async function() {
        fetch = jest.fn().mockResolvedValue({ok: true, json: () => [{
            firstName: "test",
            lastName: "test",
            email: "test",
            id: "test"
        }]})
        let user = userEvent.setup()
        render(
            <PendingMembersButton
                id={1}
                name="Dev Team"
            />
        )
        let openButton = screen.getByRole("button", { name: "Approve New Members"})
        await act(() => user.click(openButton))
        let approveButton = screen.getByRole("button", { name: "Approve" })
        await act(() => user.click(approveButton))
        await waitFor(() => {
            expect(fetch).toHaveBeenLastCalledWith(
                `/api/teams/1/members/pending/test`,
                {
                    method: "POST",
                    headers: {
                        authorization: `Bearer `,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({accepted: true})
                }
            )
        })
    })
})