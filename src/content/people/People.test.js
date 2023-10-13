// testing help
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'
import { demoUser } from '../../context/UserContext'

// to test
import People from './People'

describe('<People>', function() {
    it('should be able to query on name', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "Brandon"))
        let searchButton = screen.getByRole("button", { name: "Search"})
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
    })
    it('should be able to query on email', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "dude@gmail.com"))
        let searchButton = screen.getByRole("button", { name: "Search"})
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
    })
    it('should be able to query on phone number', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com",
                phone: "911"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "911"))
        let searchButton = screen.getByRole("button", { name: "Search"})
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
    })
    it('should be able to query on address', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com",
                phone: "911",
                address: "3rd st"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "3rd St"))
        let searchButton = screen.getByRole("button", { name: "Search"})
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
    })
    it('should be able to query and then reset', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com",
                phone: "911",
                address: "3rd st"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "3rd St"))
        let searchButton = screen.getByRole("button", { name: "Search"})
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
        await act(() => user.clear(textField))
        await act(() => user.click(searchButton))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(2)
        })
    })
    it('should be able to query on pressing {enter}', async function() {
        const user = userEvent.setup()
        fetch = jest.fn().mockResolvedValue({json: async () => [
            {
                ...demoUser,
                id: 1,
                firstName: "Brandon"
            },
            {
                ...demoUser,
                id:2,
                firstName: "Dude",
                email: "dude@gmail.com",
                phone: "911",
                address: "3rd st"
            }
        ]})
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled()
        })
        let textField = screen.getByLabelText("Search")
        await act(() => user.type(textField, "3rd St{enter}"))
        await waitFor(() => {
            let textButton = screen.getAllByRole("button", { name: "Send Text"})
            expect(textButton).toHaveLength(1)
        })
    })
})