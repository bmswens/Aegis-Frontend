// testing help
import { act, render, screen } from "@testing-library/react"
import  UserEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import api from "../api"

// to test
import TeamAutocomplete from "./TeamAutocomplete"

let simpleOrgs = [
    {
        name: "Demo Org",
        id: "fake id"
    }
]

let simpleOrgsResponse = {
    json: async () => simpleOrgs
}

describe("<TeamAutocomplete>", function() {
    it("should load the orgs and allow the users to select one", async function() {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValue(simpleOrgsResponse)
        let value = []
        let setValue = jest.fn()
        render(
            <TeamAutocomplete
                value={value}
                setValue={setValue}
            />
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        expect(setValue).toHaveBeenCalledWith([{
            name: "Demo Org",
            id: "fake id"
        }])
    })
    it("should load in a current selection without fail", async function() {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValue(simpleOrgsResponse)
        let value = [{
            name: "Demo Org",
            id: "fake id"
        }]
        let setValue = jest.fn()
        render(
            <TeamAutocomplete
                value={value}
                setValue={setValue}
            />
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
    })
})

