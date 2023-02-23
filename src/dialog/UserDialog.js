// React
import React, { useContext } from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

// custom
import UserContext from '../context/UserContext'

function UserDialog(props) {

    const { open, close } = props
    const userContext = React.useContext(UserContext)

    const [firstName, setFirstName] = React.useState(userContext.firstName)
    const [lastName, setLastName] = React.useState(userContext.lastName)
    const [address, setAddress] = React.useState(userContext.address)
    const [phone, setPhone] = React.useState(userContext.phone)
    const [email, setEmail] = React.useState(userContext.email)

    function handleClose() {
        close()
    }

    function submit() {
        /* istanbul ignore else */
        if (firstName !== userContext.firstName) {
            userContext.setFirstName(firstName)
        }
        if (lastName !== userContext.lastName) {
            userContext.setLastName(lastName)
        }
        if (address !== userContext.address) {
            userContext.setAddress(address)
        }
        if (phone !== userContext.phone) {
            userContext.setPhone(phone)
        }
        if (email !== userContext.email) {
            userContext.setEmail(email)
        }
        close()
    }

    let canSubmit = false
    if (firstName !== userContext.firstName) {
        canSubmit = true
    }
    else if (lastName !== userContext.lastName) {
        canSubmit = true
    }
    else if (address !== userContext.address) {
        canSubmit = true
    }
    else if (phone !== userContext.phone) {
        canSubmit = true
    }
    else if (email !== userContext.email) {
        canSubmit = true
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle align="center">
                User Settings
            </DialogTitle>
            <DialogContent>
                <TextField
                    label="Username"
                    fullWidth
                    disabled
                    value={userContext.username}
                />
                <TextField
                    label="First Name"
                    fullWidth
                    value={firstName}
                    onChange={event => setFirstName(event.target.value)}
                />
                <TextField
                    label="Last Name"
                    fullWidth
                    value={lastName}
                    onChange={event => setLastName(event.target.value)}
                />
                <TextField
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={event => setAddress(event.target.value)}
                />
                <TextField
                    label="Phone Number"
                    fullWidth
                    value={phone}
                    onChange={event => setPhone(event.target.value)}
                />
                <TextField
                    label="Email"
                    fullWidth
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                >
                    Close
                </Button>
                <Button
                    onClick={submit}
                    disabled={!canSubmit}
                    variant="conatined"
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDialog