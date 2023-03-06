// testing help
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// to test
import ConfirmDialog from './ConfirmDialog'

describe('<ConfirmDialog>', function() {
    it("should allow the user to cancel", async function() {
        let user = userEvent.setup()
        let close = jest.fn()
        let callback = jest.fn()
        render(
            <ConfirmDialog
                open={true}
                text="Are you sure you want to do the thing?"
                callback={callback}
                close={close}
            />
        )
        let cancel = screen.getByRole("button", { name: "Cancel" })
        await act(() => user.click(cancel))
        expect(close).toHaveBeenCalled()
        expect(callback).not.toHaveBeenCalled()
    })
    it("should allow the user to confirm", async function() {
        let user = userEvent.setup()
        let close = jest.fn()
        let callback = jest.fn()
        render(
            <ConfirmDialog
                open={true}
                text="Are you sure you want to do the thing?"
                callback={callback}
                close={close}
            />
        )
        let confirm = screen.getByRole("button", { name: "Confirm" })
        await act(() => user.click(confirm))
        expect(close).toHaveBeenCalled()
        expect(callback).toHaveBeenCalled()
    })
})