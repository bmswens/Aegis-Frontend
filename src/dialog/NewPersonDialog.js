// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// custom
import api from '../api'
import PersonAutocomplete from '../components/PersonAutocomplete'
import TeamAutoComplete from '../components/TeamAutocomplete'

const emptyData = {
    firstName: '',
    lastName: '',
    title: '',
    address: '',
    email: '',
    phone: '',
    supervisor: null,
    team: null
}


function NewPersonDialog(props) {

    const { open, close } = props
    const [data, setData] = React.useState(emptyData)

    function handleClose() {
        setData(emptyData)
        close()
    }

    function submit() {
        let submitData = {
            ...data,
            supervisor: data.supervisor.id,
            team: data.team.id
        }
        api.people.addPerson(submitData)
        handleClose()
    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Add New Person
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{marginTop: 1}}
                >
                    <TextField
                        label="First Name"
                        fullWidth
                        value={data.firstName}
                        onChange={(event) => setData({...data, firstName: event.target.value})}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={data.lastName}
                        onChange={(event) => setData({...data, lastName: event.target.value})}
                    />
                    <TextField
                        label="Title"
                        fullWidth
                        value={data.title}
                        onChange={(event) => setData({...data, title: event.target.value})}
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
                    <PersonAutocomplete
                        value={data.supervisor}
                        setValue={value => setData({...data, supervisor: value})}
                    />
                    <TeamAutoComplete
                        value={data.team}
                        setValue={value => setData({...data, team: value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                >
                    Cancel
                </Button>
                <Button
                    onClick={submit}
                    variant="contained"
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default NewPersonDialog