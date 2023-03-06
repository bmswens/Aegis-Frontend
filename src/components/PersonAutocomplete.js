// React
import React from 'react'

// MUI
import { Autocomplete, TextField } from '@mui/material'

// custom
import api from '../api'

function PersonAutocomplete(props) {
    const {value, setValue, disabled} = props

    const [loading, setLoading] = React.useState(true)
    const [people, setPeople] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let p = await api.people.getShortPeople()
            setPeople(p)
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
            options={people}
            getOptionLabel={option => option.name}
            onChange={(event, newValue) => setValue(newValue)}
            renderInput={params => <TextField {...params} label="Supervisor" />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    )
}

export default PersonAutocomplete