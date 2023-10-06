// React
import React from 'react'

// keycloak
import { useKeycloak } from '@react-keycloak/web'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import api from '../api/custom'


function AccountButton(props) {

    const { keycloak } = useKeycloak()

    if (keycloak.authenticated) {
        return (
            <Button
                variant="contained"
                onClick={keycloak.logout}
            >
                Logout
            </Button>
        )
    }
    else {
        return (
            <Button
                variant="contained"
                onClick={keycloak.login}
            >
                Login
            </Button>
        )
    }
}

function AccountInfo(props) {

    const { keycloak } = useKeycloak()
    const [accountInfo, setAccountInfo] = React.useState({})

    React.useEffect(() => {
        async function load() {
            let userInfo = await api.getSelf(keycloak.token)
            setAccountInfo(userInfo)
        }
        if (keycloak.authenticated) {
            load()
        }
    }, [keycloak])

    if (!keycloak.authenticated) {
        return null
    }

    return (
        <>
            <TextField
                label="First Name"
                value={accountInfo.firstName}
            />
            <TextField
                label="Last Name"
                value={accountInfo.lastName}
            />
            <TextField
                label="Email"
                disabled
                value={accountInfo.email}
            />
            <TextField
                label="Title"
                value={accountInfo.title}
            />
            <TextField
                label="Address"
                value={accountInfo.address}
            />
            <TextField
                label="Phone"
                value={accountInfo.phone}
            />
        </>
    )
}

function AccountDialog(props) {
    // for use with keycloak and api
    const { open, close } = props

    const { keycloak } = useKeycloak()

    console.log(keycloak.tokenParsed)
    console.log(keycloak.token)

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
                    <AccountInfo />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Close
                </Button>
                <Box sx={{ flexGrow: 1 }} />
                <AccountButton />
            </DialogActions>
        </Dialog>
    )
}

export default AccountDialog