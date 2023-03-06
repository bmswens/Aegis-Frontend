// React
import React from 'react'

//MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import api from '../api'

const emptyTeam = {
    name: "",
    address: "",
    email: "",
    phone: ""
}

function TeamDialog(props) {

    const { open, close } = props
    const [data, setData] = React.useState(emptyTeam)

    function handleClose() {
        setData(emptyTeam)
        close()
    }

    async function submit() {
        await api.org.addTeam(data)
        handleClose()
    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <DialogTitle align="center">
                Add New Team
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        label="Name"
                        fullWidth
                        value={data.firstName}
                        onChange={(event) => setData({...data, name: event.target.value})}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        value={data.address}
                        onChange={(event) => setData({...data, address: event.target.value})}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={data.email}
                        onChange={(event) => setData({...data, email: event.target.value})}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        value={data.phone}
                        onChange={(event) => setData({...data, phone: event.target.value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default TeamDialog