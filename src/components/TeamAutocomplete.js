// React
import React from 'react'

// MUI
import { Autocomplete, TextField } from '@mui/material'

// custom
import api from '../api'

function TeamAutoComplete(props) {

    const {value, setValue, disabled} = props

    const [loading, setLoading] = React.useState(true)
    const [teams, setTeams] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let t = await api.org.getShortOrgs()
            setTeams(t)
            setLoading(false)
        }
        load()
    }, [])

    return (
        <Autocomplete
            disabled={disabled}
            fullWidth
            loading={loading}
            value={value}
            options={teams}
            getOptionLabel={option => option.name}
            onChange={(event, newValue) => setValue(newValue)}
            renderInput={params => <TextField {...params} label="Team" />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    )
}

export default TeamAutoComplete