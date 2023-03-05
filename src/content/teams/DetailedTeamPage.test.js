// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import api from '../../api'
import mediaQuery from 'css-mediaquery';

// to test
import DetailedTeamPage from './DetailedTeamPage'

function createMatchMedia(width) {
    return (query) => ({
        matches: mediaQuery.match(query, {
            width,
        }),
        addListener: () => { },
        removeListener: () => { },
    });
}

describe("<DetailedTeamPage> small screen", function () {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(600)
    })
    it("should hide a lot of columns on small screens", async function () {
        render(
            <MemoryRouter
                initialEntries={["/teams/uuid"]}
            >
                <Routes>
                    <Route
                        path="/teams/:uuid"
                        element={<DetailedTeamPage />}
                    />
                </Routes>
            </MemoryRouter>
        )
        await waitFor(() => {
            let emailButton = screen.getByRole("button", { name: "Send Email" })
            expect(emailButton).not.toBeNull()
        })
        let title = screen.queryByText(/Title/)
        expect(title).toBeNull()
    })
})

describe('<DetailedTeamPage>', function () {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(1200)
    })
    it("should use the api to load details", async function () {
        let spy = jest.spyOn(api.org, "getDetailedOrg")
        render(
            <MemoryRouter
                initialEntries={["/teams/uuid"]}
            >
                <Routes>
                    <Route
                        path="/teams/:uuid"
                        element={<DetailedTeamPage />}
                    />
                </Routes>
            </MemoryRouter>
        )
        await waitFor(() => {
            let emailButton = screen.getByRole("button", { name: "Send Email" })
            expect(emailButton).not.toBeNull()
        })
        expect(spy).toHaveBeenCalledWith("uuid")
    })
})
