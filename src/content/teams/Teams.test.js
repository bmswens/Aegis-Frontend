// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import api from '../../api'

// to test
import Teams from './Teams'

describe('<Teams>', function() {
    it("should use the API to load the teams", async function() {
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
            let buttons = screen.getAllByRole("button", { name: "Send Email"})
            expect(buttons).not.toHaveLength(0)
        })
    })
})