// React
import React from 'react'

// auth
import { useAuth } from 'react-oidc-context'

// MUI
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material'


function LoginDialog(props) {

    const { open, close } = props
    const auth = useAuth()

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="xs"
            fullWidth
            scroll="body"
        >
            <DialogTitle align="center">
                Authentication Options
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{ marginTop: 1 }}
                >
                    <Button
                        variant="contained"
                        onClick={auth.signinRedirect}
                    >
                        Sign In / Sign Up
                    </Button>
                    <Button
                        variant="contained"
                        onClick={close}
                    >
                        Close
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )

}

export default LoginDialog