// testing help
import { act, render, screen } from "@testing-library/react"
import  UserEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import api from "../api"

// to test
import PersonAutocomplete from "./PersonAutocomplete"

describe('api.people.getShortPeople()', function() {
    it("should return a name and id", async function() {
        let people = await api.people.getShortPeople()
        for (let person of people) {
            expect(person.name).not.toBeUndefined()
            expect(person.id).not.toBeUndefined()
        }
    })
})

describe("<PersonAutocomplete>", function() {
    it("should load the people and allow the users to select one", async function() {
        let user = UserEvent.setup()
        api.people.getShortPeople = jest.fn().mockResolvedValue([
            {
                name: "Brandon Swenson",
                id: "fake id"
            }
        ])
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
})

