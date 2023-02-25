// testing help
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'

// to test
import People from './People'

describe('<People>', function() {
    it("should render the demo data", async function() {
        const spy = jest.spyOn(api.people, "getPeople")
        render(
            <BrowserRouter>
                <People />
            </BrowserRouter>
        )
        await waitFor(() => {
            expect(spy).toHaveBeenCalled()
        })
        await waitFor(() => {
            let buttons = screen.getAllByRole("button")
            expect(buttons.length).not.toBe(0)
        })
    })
})