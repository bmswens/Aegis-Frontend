// React
import React from 'react'

// keycloak
import { useAuth } from 'react-oidc-context'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import api from '../api'


const defaultAccountInfo = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    title: "",
    address: "",
    lastUpdated: ""
}


function LogoutButton(props) {
    const auth = useAuth()
    const { close } = props
    function handleClick() {
        close()
        auth.signoutSilent()
    }
    return (
        <Button
            onClick={handleClick}
        >
            Logout
        </Button>
    )
}

function AccountDialog(props) {

    const { open, close } = props

    // content load and update
    const auth = useAuth()
    const [accountInfo, setAccountInfo] = React.useState(defaultAccountInfo)

    React.useEffect(() => {
        async function load() {
            let userInfo = await api.getSelf(auth.user.access_token)
            setAccountInfo(userInfo)
        }
        if (auth.isAuthenticated) {
            load()
        }
    }, [auth])

    async function update() {
        let body = {...accountInfo}
        delete body.lastUpdated
        delete body.email
        await api.updateSelf(body, auth.user.access_token)
        close()
    }

    if (!accountInfo.email) {
        return null
    }

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
            scroll="body"
        >
            <DialogTitle
                align="center"
            >
                Account Info
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    <TextField
                        label="First Name"
                        value={accountInfo.firstName}
                        onChange={event => setAccountInfo({ ...accountInfo, firstName: event.target.value })}
                    />
                    <TextField
                        label="Last Name"
                        value={accountInfo.lastName}
                        onChange={event => setAccountInfo({ ...accountInfo, lastName: event.target.value })}
                    />
                    <TextField
                        label="Email"
                        disabled
                        value={accountInfo.email}
                    />
                    <TextField
                        label="Title"
                        value={accountInfo.title}
                        onChange={event => setAccountInfo({ ...accountInfo, title: event.target.value })}
                    />
                    <TextField
                        label="Address"
                        value={accountInfo.address}
                        onChange={event => setAccountInfo({ ...accountInfo, address: event.target.value })}
                    />
                    <TextField
                        label="Phone"
                        value={accountInfo.phone}
                        onChange={event => setAccountInfo({ ...accountInfo, phone: event.target.value })}
                    />
                    <TextField
                        label="Last Updated"
                        disabled
                        value={accountInfo.lastUpdated}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <LogoutButton
                    close={close}
                />
                <Button
                    variant="contained"
                    onClick={update}
                >
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountDialog