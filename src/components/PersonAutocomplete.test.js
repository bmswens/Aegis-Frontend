// testing help
import { act, render, screen } from "@testing-library/react"
import  UserEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import api from "../api"

// to test
import PersonAutocomplete from "./PersonAutocomplete"

let simplePeople = [
    {
        name: "Brandon Swenson",
        id: "fake id"
    },
    {
        name: "Johnny Test",
        id: "faker id"
    }
]

let simplePeopleResponse = {
    json: async () => simplePeople
}

describe('api.people.getPeopleSimple()', function() {
    it("should return a name and id", async function() {
        fetch = jest.fn().mockResolvedValue(simplePeopleResponse)
        let people = await api.people.getPeopleSimple()
        for (let person of people) {
            expect(person.name).not.toBeUndefined()
            expect(person.id).not.toBeUndefined()
        }
    })
})

describe("<PersonAutocomplete>", function() {
    it("should load the people and allow the users to select one", async function() {
        fetch = jest.fn().mockResolvedValue(simplePeopleResponse)
        let user = UserEvent.setup()
        let value = null
        let setValue = jest.fn()
        render(
            <PersonAutocomplete
                value={value}
                setValue={setValue}
            />
        )
        let selectionBox = screen.getByLabelText("Supervisor")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Brandon Swenson")
        await act(() => user.click(org))
        expect(setValue).toHaveBeenCalledWith({
            name: "Brandon Swenson",
            id: "fake id"
        })
    })
    it("should load in a current selection without fail", async function() {
        fetch = jest.fn().mockResolvedValue(simplePeopleResponse)
        let user = UserEvent.setup()
        let value = {
            name: "Johnny Test",
            id: "faker id"
        }
        let setValue = jest.fn()
        render(
            <PersonAutocomplete
                value={value}
                setValue={setValue}
            />
        )
        let selectionBox = screen.getByLabelText("Supervisor")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Brandon Swenson")
        await act(() => user.click(org))
        expect(setValue).toHaveBeenCalledWith({
            name: "Brandon Swenson",
            id: "fake id"
        })
    })
})

