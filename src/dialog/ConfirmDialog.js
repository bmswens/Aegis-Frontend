// REact
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

function ConfirmDialog(props) {

    const {open, close, callback, text} = props

    function confirm() {
        callback()
        close()
    }

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Confirmation Dialog
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={confirm}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog