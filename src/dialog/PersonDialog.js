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
    teams: []
}

function makeStartData(person) {
    if (!person) {
        return emptyData
    }
    let startData = {}
    for (let key in emptyData) {
        if (person[key] === undefined) {
            startData[key] = emptyData[key]
        }
        else {
            startData[key] = person[key]
        }
    }
    return startData
}

function PersonDialog(props) {

    const { 
        open, 
        close,
        person,
        viewOnly
    } = props

    let startData = makeStartData(person)
    const [data, setData] = React.useState(startData)

    function handleClose() {
        if (!viewOnly && !person?.id) {
            setData(emptyData)
        }
        close()
    }

    function submit() {
        let submitData = {
            ...data
        }
        if (data.supervisor?.id) {
            submitData.supervisor = data.supervisor.id
        }
        if (data.teams.length) {
            submitData.teams = data.teams.map(team => team.id)
        }
        if (data.id) {
            api.people.updatePerson(submitData)
        }
        else {
            api.people.addPerson(submitData)
        }
        handleClose()
    }

    let title = "Add New Person"
    if (viewOnly) {
        title = "Person Info"
    }
    else if (person?.id) {
        title = "Edit Info"
    } 

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
        >
            <DialogTitle align="center">
                {title}
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
                        value={data.teams}
                        setValue={value => setData({...data, teams: value})}
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