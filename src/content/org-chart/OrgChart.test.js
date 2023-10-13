// testing help
import { act, render, screen, waitFor } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"

// to test
import OrgChart from './OrgChart'

// recommended patching
import mediaQuery from 'css-mediaquery'
import ThemeContext from "../../context/ThemeContext"
import api from "../../api"

function createMatchMedia(width) {
    return (query) => ({
        matches: mediaQuery.match(query, {
            width,
        }),
        addListener: () => { },
        removeListener: () => { },
    });
}

describe("<OrgChart>", function () {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(window.innerWidth)
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should gather and display people based on org", async function () {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => [
                {
                    name: "Demo Org",
                    id: "fake id"
                }
            ]
        })
            .mockResolvedValueOnce({
                json: async () => {
                    return {
                        children: [],
                        id: "1",
                        firstName: "Brandon Swenson",
                        email: "bmswens@gmail.com"

                    }
                }
            })
        render(
            <BrowserRouter>
                <ThemeContext>
                    <OrgChart />
                </ThemeContext>
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        await waitFor(() => {
            let name = screen.getByText(/Brandon Swenson/)
            expect(name).not.toBeNull()
            // let emailButtons = screen.queryAllByRole("button", { "name": "Send Email" })
            // expect(emailButtons).not.toHaveLength(0)
        })
    }, 30000)
})

describe("<OrgChart> small screen", function () {
    beforeAll(() => {
        window.matchMedia = createMatchMedia(600)
        window.innerWidth = 600
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
    it("should not scale if there's no canvas", async function () {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => [
                {
                    name: "Demo Org",
                    id: "fake id"
                }
            ]
        })
            .mockResolvedValueOnce({
                json: async () => {
                    return {
                        children: [],
                        id: 1,
                        firstName: "Brandon Swenson",
                        email: "bmswens@gmail.com"

                    }
                }
            })
        render(
            <BrowserRouter>
                <ThemeContext>
                    <OrgChart />
                </ThemeContext>
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        let emailButtons = screen.queryAllByRole("button", { "name": "Send Email" })
        expect(emailButtons).not.toHaveLength(0)
    }, 30000)
    it("should gather and display people based on org", async function () {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => [
                {
                    name: "Demo Org",
                    id: "fake id"
                }
            ]
        })
            .mockResolvedValueOnce({
                json: async () => {
                    return {
                        children: [],
                        id: 1,
                        firstName: "Brandon Swenson",
                        email: "bmswens@gmail.com"

                    }
                }
            })
        render(
            <BrowserRouter>
                <ThemeContext>
                    <OrgChart />
                    <canvas className="orgchart chart" />
                </ThemeContext>
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        let emailButtons = screen.queryAllByRole("button", { "name": "Send Email" })
        expect(emailButtons).not.toHaveLength(0)
    }, 30000)
    it("should allow users to zoom in", async function () {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => [
                {
                    name: "Demo Org",
                    id: "fake id"
                }
            ]
        })
            .mockResolvedValueOnce({
                json: async () => {
                    return {
                        children: [],
                        id: 1,
                        firstName: "Brandon Swenson",
                        email: "bmswens@gmail.com"

                    }
                }
            })
        render(
            <BrowserRouter>
                <ThemeContext>
                    <OrgChart />
                    <canvas className="orgchart chart" />
                </ThemeContext>
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        let emailButtons = screen.queryAllByRole("button", { "name": "Send Email" })
        expect(emailButtons).not.toHaveLength(0)
        let zoominButton = screen.getByRole("button", { name: "Zoom In" })
        await act(async () => await user.click(zoominButton))
        let canvas = document.getElementsByClassName("orgchart chart")[0]
        expect(canvas.style.transform).toEqual("matrix(0.5, 0, 0, 0.5, 0, 0)")
    }, 30000)
    it("should allow users to zoom out to 0.1, then disable", async function () {
        let user = UserEvent.setup()
        fetch = jest.fn().mockResolvedValueOnce({
            json: async () => [
                {
                    name: "Demo Org",
                    id: "fake id"
                }
            ]
        })
            .mockResolvedValueOnce({
                json: async () => {
                    return {
                        children: [],
                        id: 1,
                        firstName: "Brandon Swenson",
                        email: "bmswens@gmail.com"

                    }
                }
            })
        render(
            <BrowserRouter>
                <ThemeContext>
                    <OrgChart />
                    <canvas className="orgchart chart" />
                </ThemeContext>
            </BrowserRouter>
        )
        let selectionBox = screen.getByLabelText("Team")
        await act(() => user.click(selectionBox))
        let org = screen.getByText("Demo Org")
        await act(() => user.click(org))
        let emailButtons = screen.queryAllByRole("button", { "name": "Send Email" })
        expect(emailButtons).not.toHaveLength(0)
        let zoomoutButton = screen.getByRole("button", { name: "Zoom Out" })
        await act(async () => await user.click(zoomoutButton))
        await act(async () => await user.click(zoomoutButton))
        await act(async () => await user.click(zoomoutButton))
        let canvas = document.getElementsByClassName("orgchart chart")[0]
        // gotta love floating point numbers
        expect(canvas.style.transform).toEqual("matrix(0.10000000000000003, 0, 0, 0.10000000000000003, 0, 0)")
        let buttonAgain = screen.getByRole("button", { name: "Zoom Out" })
        expect(buttonAgain.disabled).toBeTruthy()
    }, 30000)
})
