// testing help
import { act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import PersonInfoDialog from './PersonInfoDialog'

describe('<PersonInfoDialog>', function() {
    it("should close on button press", async function() {
        let user = userEvent.setup()
        let close = jest.fn()
        render(
            <PersonInfoDialog
                open={true}
                close={close}
            />
        )
        let closeButton = screen.getByRole("button", { name: "Close" })
        await act(() => user.click(closeButton))
        expect(close).toHaveBeenCalled()
    })
    it("should display the person's first name", async function() {
        let close = jest.fn()
        let expected = "Brandon"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                firstName={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the person's last name", async function() {
        let close = jest.fn()
        let expected = "Swenson"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                lastName={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the person's title", async function() {
        let close = jest.fn()
        let expected = "App Dev"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                title={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the person's address", async function() {
        let close = jest.fn()
        let expected = "317 W. 3rd"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                address={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the person's phone", async function() {
        let close = jest.fn()
        let expected = "911"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                phone={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
    it("should display the person's email", async function() {
        let close = jest.fn()
        let expected = "example@gmail.com"
        render(
            <PersonInfoDialog
                open={true}
                close={close}
                email={expected}
            />
        )
        let actual = screen.getByDisplayValue(expected)
        expect(actual).not.toBeNull()
    })
})