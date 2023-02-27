// testing help
import { act, render, screen } from "@testing-library/react"
import  UserEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

// to test
import OrgChart from './OrgChart'

describe("<OrgChart>", function() {
    it("should gather and display people based on org", async function() {
        let user = UserEvent.setup()
        render(
            <BrowserRouter>
                <OrgChart />
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        let emailButtons = screen.queryAllByRole("button", { "name": "Send Email"})
        expect(emailButtons).not.toHaveLength(0)
    })
})