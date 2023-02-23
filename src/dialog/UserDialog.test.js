// testing help
import {act, render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserContext from '../context/UserContext'
import { demoUser } from '../context/UserContext'

// to test
import UserDialog from './UserDialog'

// user-event docs say that wrapping in act is not required
// but jest raises act warnings without it
describe('<UserDialog>', function() {
    it("should be able to close without applying changes", async function() {
        const user = userEvent.setup()
        let value = {
            ...demoUser,
            setFirstName: jest.fn(),
            setLastName: jest.fn(),
            setAddress: jest.fn(),
            setPhone: jest.fn(),
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
        let closeButton = screen.getByRole("button", { name: "Cancel" })
        await act(() => user.click(closeButton))
        expect(value.setFirstName).not.toHaveBeenCalled()
        expect(value.setLastName).not.toHaveBeenCalled()
        expect(value.setAddress).not.toHaveBeenCalled()
        expect(value.setPhone).not.toHaveBeenCalled()
        expect(value.setEmail).not.toHaveBeenCalled()
        expect(close).toHaveBeenCalled()

    })
    it("should display the user's username", function() {
        render(
            <UserContext.Provider value={demoUser}>
                <UserDialog
                    open={true}
                    close={() => {}}
                />
            </UserContext.Provider>
        )
        let actual = screen.getByDisplayValue("DemoUser")
        expect(actual).not.toBeNull()
    })
    it("should allow a user to update their first name", async function() {
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
    it("should allow a user to update their last name", async function() {
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
    it("should allow a user to update their address", async function() {
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
    it("should allow a user to update their phone number", async function() {
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
    it("should allow a user to update their email", async function() {
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
})