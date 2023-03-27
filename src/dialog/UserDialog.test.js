    // testing help
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import api from '../api'
import db from '../api/local/db'
import APIContext, { APIContextProvider } from '../context/APIContext'
import UserContext, { UserContextProvider } from '../context/UserContext'
import { demoUser } from '../context/UserContext'

// to test
import UserDialog from './UserDialog'

const mockFileDownload = jest.fn();
jest.mock('js-file-download', () => ({
    __esModule: true,
    default: () => mockFileDownload()
}));

jest.mock('dexie-export-import', () => {
    return {
        importDB: jest.fn(),
        exportDB: jest.fn()
    }
})

// user-event docs say that wrapping in act is not required
// but jest raises act warnings without it
describe('<UserDialog>', function () {
    it("should be able to close without applying changes", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setFirstName: jest.fn(),
            setLastName: jest.fn(),
            setAddress: jest.fn(),
            setPhone: jest.fn(),
            setEmail: jest.fn(),
            setTitle: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let closeButton = screen.getByRole("button", { name: "Cancel" })
        await act(() => user.click(closeButton))
        expect(value.setFirstName).not.toHaveBeenCalled()
        expect(value.setLastName).not.toHaveBeenCalled()
        expect(value.setAddress).not.toHaveBeenCalled()
        expect(value.setPhone).not.toHaveBeenCalled()
        expect(value.setEmail).not.toHaveBeenCalled()
        expect(value.setTitle).not.toHaveBeenCalled()
        expect(close).toHaveBeenCalled()

    })
    it("should display the user's username", function () {
        render(
            <UserContext.Provider value={demoUser}>
                <UserDialog
                    open={true}
                    close={() => { }}
                />
            </UserContext.Provider>
        )
        let actual = screen.getByDisplayValue("DemoUser")
        expect(actual).not.toBeNull()
    })
    it("should allow a user to update their first name", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setFirstName: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("First Name")
        await act(() => user.type(textField, " My New Name"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setFirstName).toHaveBeenCalledWith("Demo My New Name")
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update their last name", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setLastName: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("Last Name")
        await act(() => user.type(textField, " My New Name"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setLastName).toHaveBeenCalledWith("User My New Name")
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update their address", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setAddress: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("Address")
        await act(() => user.type(textField, " My New Address"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setAddress).toHaveBeenCalledWith(`${demoUser.address} My New Address`)
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update their phone number", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setPhone: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("Phone Number")
        await act(() => user.type(textField, " My New Phone"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setPhone).toHaveBeenCalledWith(`${demoUser.phone} My New Phone`)
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update their email", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setEmail: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("Email")
        await act(() => user.type(textField, " My New Email"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setEmail).toHaveBeenCalledWith(`${demoUser.email} My New Email`)
        expect(close).toHaveBeenCalled()
    })
    it("should allow a user to update their title", async function () {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setTitle: jest.fn()
        }
        let close = jest.fn()
        render(
            <UserContext.Provider value={value}>
                <UserDialog
                    open={true}
                    close={close}
                />
            </UserContext.Provider>
        )
        let textField = screen.getByLabelText("Title")
        await act(() => user.type(textField, " My New Title"))
        let applyButton = screen.getByRole("button", { name: "Apply" })
        await act(() => user.click(applyButton))
        expect(value.setTitle).toHaveBeenCalledWith(`${demoUser.title} My New Title`)
        expect(close).toHaveBeenCalled()
    })
})

describe('<StorageOptions>', function () {

    beforeEach(() => {
        window.localStorage.setItem("storageDriver", '"local"')
        window.URL.createObjectURL = jest.fn()
    })
    it('should allow a user to upload a database', async function () {
        const user = userEvent.setup()
        render(
            <APIContext.Provider value={{storageDriver: "local", api: {db: db}}}>
                <UserContextProvider>
                    <UserDialog
                        open={true}
                        close={close}
                    />
                </UserContextProvider>
            </APIContext.Provider>
        )
        let button = screen.getByRole("button", { name: "Download Database" })
        await act(() => user.click(button))
        await waitFor(() => {
            expect(mockFileDownload).toHaveBeenCalled()
        })
    })
    it("should allow a user to download a database", async function () {
        const user = userEvent.setup()
        render(
            <APIContext.Provider value={{storageDriver: "local"}}>
                <UserContextProvider>
                    <UserDialog
                        open={true}
                        close={close}
                    />
                </UserContextProvider>
            </APIContext.Provider>
        )
        let button = screen.getByRole("button", { name: "Upload Database" })
        await act(() => user.click(button))
        let input = document.getElementById("database-input")
        const f = new File([], 'upload.json')
        await act(() => user.upload(input, f))
    })
    it("should allow the user to change their driver", async function() {
        const user = userEvent.setup()
        let change = jest.fn()
        render(
            <APIContext.Provider value={{storageDriver: "local", setStorageDriver: change}}>
                <UserContextProvider>
                    <UserDialog
                        open={true}
                        close={close}
                    />
                </UserContextProvider>
            </APIContext.Provider>
        )
        let button = screen.getByLabelText("Storage Driver")
        await act(() => user.click(button))
        let demo = screen.getByRole("option", { name: "Demo"})
        await act(() => user.click(demo))
        await waitFor(() => {
            expect(change).toHaveBeenCalledWith("demo")
        })
    })
})