// React
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import React from 'react'

function PersonInfoDialog(props) {
    const {
        firstName,
        lastName,
        title,
        address,
        phone,
        email,
        open, 
        close
    } = props

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Personal Info
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <TextField
                        label="First Name"
                        fullWidth
                        disabled
                        value={firstName}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        disabled
                        value={lastName}
                    />
                    <TextField
                        label="Title"
                        fullWidth
                        disabled
                        value={title}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        disabled
                        value={address}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        disabled
                        value={phone}
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        disabled
                        value={email}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PersonInfoDialog