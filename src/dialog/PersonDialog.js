// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'

// custom
import api from '../api'
import PersonAutocomplete from '../components/PersonAutocomplete'
import TeamAutoComplete from '../components/TeamAutocomplete'

const emptyData = {
    id: null,
    firstName: '',
    lastName: '',
    title: '',
    address: '',
    email: '',
    phone: '',
    supervisor: null,
    team: null
}


function PersonDialog(props) {

    const { 
        open, 
        close,
        person,
        viewOnly
    } = props
    const [data, setData] = React.useState(person || emptyData)

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
        if (data.id) {
            api.people.updatePerson(submitData)
        }
        else {
            api.people.addPerson(submitData)
        }
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
                        disabled={viewOnly}
                        label="First Name"
                        fullWidth
                        value={data.firstName}
                        onChange={(event) => setData({...data, firstName: event.target.value})}
                    />
                    <TextField
                        disabled={viewOnly}
                        label="Last Name"
                        fullWidth
                        value={data.lastName}
                        onChange={(event) => setData({...data, lastName: event.target.value})}
                    />
                    <TextField
                        disabled={viewOnly}
                        label="Title"
                        fullWidth
                        value={data.title}
                        onChange={(event) => setData({...data, title: event.target.value})}
                    />
                    <TextField
                        disabled={viewOnly}
                        label="Address"
                        fullWidth
                        value={data.address}
                        onChange={(event) => setData({...data, address: event.target.value})}
                    />
                    <TextField
                        disabled={viewOnly}
                        label="Email"
                        fullWidth
                        value={data.email}
                        onChange={(event) => setData({...data, email: event.target.value})}
                    />
                    <TextField
                        disabled={viewOnly}
                        label="Phone"
                        fullWidth
                        value={data.phone}
                        onChange={(event) => setData({...data, phone: event.target.value})}
                    />
                    <PersonAutocomplete
                        disabled={viewOnly}
                        value={data.supervisor}
                        setValue={value => setData({...data, supervisor: value})}
                    />
                    <TeamAutoComplete
                        disabled={viewOnly}
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
                    { viewOnly ? "Close" : "Cancel" }
                </Button>
                { viewOnly ? null :
                <Button
                    onClick={submit}
                    variant="contained"
                >
                    Submit
                </Button>
                }
            </DialogActions>
        </Dialog>
    )

}

export default PersonDialog