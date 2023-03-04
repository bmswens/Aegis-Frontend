// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'

// to test
import Teams from './Teams'

async function search(text, user) {
    let textbox = screen.getByLabelText("Search")
    await act(async () => await user.type(textbox, text))
    let button = screen.getByRole("button", { name: "Search" })
    await act(async () => await user.click(button))
}

const mockOrgs = [
    {
        name: "Dev Team",
        id: "1",
        memberCount: 2,
        address: "The Moon",
        email: "Dev@gmail.com",
        phone: "911"
    },
    {
        name: "A",
        id: "2",
        memberCount: 3,
        address: "USA",
        email: "dank@gmail.com",
        phone: "011"
    }
]

describe('<Teams>', function () {
    it("should use the API to load the teams", async function () {
        let spy = jest.spyOn(api.org, "getOrgs")
        render(
            <BrowserRouter>
                <Teams />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(spy).toHaveBeenCalled()
        })
        await waitFor(() => {
            let buttons = screen.getAllByRole("button", { name: "Send Email" })
            expect(buttons).not.toHaveLength(0)
        })
    })
    it("should be able to query on name", async function () {
        const user = userEvent.setup()
        api.org.getOrgs = jest.fn().mockResolvedValue(mockOrgs)
        render(
            <BrowserRouter>
                <Teams />
            </BrowserRouter>
        )
        await search("Dev Team", user)
        await waitFor(() => {
            let buttons = screen.getAllByRole("button", { name: "Send Email"})
            expect(buttons).toHaveLength(1)
        })
    })
    it("should be able to query on email", async function () {
        const user = userEvent.setup()
        api.org.getOrgs = jest.fn().mockResolvedValue(mockOrgs)
        render(
            <BrowserRouter>
                <Teams />
            </BrowserRouter>
        )
        await search("Dev@gmail.com", user)
        await waitFor(() => {
            let buttons = screen.getAllByRole("button", { name: "Send Email"})
            expect(buttons).toHaveLength(1)
        })
    })
    it("should be able to query on address", async function () {
        const user = userEvent.setup()
        api.org.getOrgs = jest.fn().mockResolvedValue(mockOrgs)
        render(
            <BrowserRouter>
                <Teams />
            </BrowserRouter>
        )
        await search("The Moon", user)
        await waitFor(() => {
            let buttons = screen.getAllByRole("button", { name: "Send Email"})
            expect(buttons).toHaveLength(1)
        })
    })
    it("should be able to query on phone", async function () {
        const user = userEvent.setup()
        api.org.getOrgs = jest.fn().mockResolvedValue(mockOrgs)
        render(
            <BrowserRouter>
                <Teams />
            </BrowserRouter>
        )
        await search("911", user)
        await waitFor(() => {
            let buttons = screen.getAllByRole("button", { name: "Send Email"})
            expect(buttons).toHaveLength(1)
        })
    })
})