// React
import React from 'react'

//MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import api from '../api'

const emptyTeam = {
    id: null,
    name: "",
    address: "",
    email: "",
    phone: ""
}

function TeamDialog(props) {

    const { open, close, team } = props
    let startData = emptyTeam
    if (team?.id) {
        startData = team
    }
    const [data, setData] = React.useState(startData)
    
    function handleClose() {
        if (!team?.id) {
            setData(emptyTeam)
        }
        close()
    }

    async function submit() {
        if (team?.id) {
            await api.org.editTeam(data)
        }
        else {
            await api.org.addTeam(data)
        }
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
                {team?.id ? "Edit Team" : "Add New Team"}
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        label="Name"
                        fullWidth
                        value={data.name}
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