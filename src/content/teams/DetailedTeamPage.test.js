// testing help
import { screen, render, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import api from '../../api'
import mediaQuery from 'css-mediaquery';

// to test
import DetailedTeamPage from './DetailedTeamPage'

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
    it("should hide a lot of columns on small screens", async function () {
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => {
                return {
                    name: "Dev Team",
                    memberCount: 0,
                    address: "x",
                    email: "xxx",
                    phone: "xx",
                    admins: [],
                    members: []
                }
            }
        })
        .mockResolvedValue({ json: () => [] })
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
    it("should use the api to load details", async function () {
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => {
                return {
                    name: "Dev Team",
                    memberCount: 0,
                    address: "x",
                    email: "xxx",
                    phone: "xx",
                    admins: [],
                    members: []
                }
            }
        }).mockResolvedValue({json: () => []})
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
        expect(fetch).toHaveBeenCalledTimes(3)
    })
})
