// React
import React from 'react'

// MUI
import { Button, Card, CardContent, Grid, Skeleton, TextField } from '@mui/material'

// custom
import { ContentGrid } from '../Content'
import PersonCard from './PersonCard'
import api from '../../api'
import { Stack } from '@mui/system'

function PersonSearch(props) {
    const { search, setSearch } = props
    const [ text, setText ] = React.useState(search)
    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    width: "100%"
                }}
            >
                <CardContent>
                    <Stack
                        alignItems="flex-end"
                        spacing={1}
                    >
                        <TextField
                            fullWidth
                            type="search"
                            label="Search"
                            value={text}
                            onChange={event => setText(event.target.value)}
                            onKeyDown={event => {
                                if (event.key === "Enter") {
                                    setSearch(text)
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={() => setSearch(text)}
                        >
                            Search
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    )
}

function PersonSkeleton(props) {
    return (
        <Grid item xs={12}>
            <Skeleton
                variant="rectangular"
                height="15vh"
                width="100%"
            />
        </Grid>
    )
}

function People(props)  {

    // data load
    const [loading, setLoading] = React.useState(true)
    const [people, setPeople] = React.useState([])
    const [toDisplay, setToDisplay] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let p = await api.people.getPeople()
            setPeople(p)
            setToDisplay(p)
            setLoading(false)
        }
        load()
    }, [])

    // search
    // TODO: May slow down if there are too many people.
    // If that happens, switch to server-side searching.
    const [ search, setSearch ] = React.useState('')

    // sets the skeletons so users know something is happening
    React.useEffect(() => {
        setLoading(true)
    }, [search])

    // we're going to use case insensitive search
    React.useEffect(() => {
        if (people && search && loading) {
            let lSearch = search.toLowerCase()
            let output = []
            for (let person of people) {
                let fullName = `${person.firstName} ${person.lastName}`.toLowerCase()
                if (fullName.includes(lSearch)) {
                    output.push(person)
                }
                else if (person.email.toLowerCase().includes(lSearch)) {
                    output.push(person)
                }
                else if (person.phone.toLowerCase().includes(lSearch)) {
                    output.push(person)
                }
                else if (person.address.toLowerCase().includes(lSearch)) {
                    output.push(person)
                }
            }
            setToDisplay(output)
            setLoading(false)
        }
        else if (people && loading && !search) {
            setToDisplay(people)
            setLoading(false)
        }
    }, [people, search, loading, setToDisplay])

    return (
        <ContentGrid>
            <PersonSearch
                search={search}
                setSearch={setSearch}
            />
            { loading ?
                [1, 2, 3, 4, 5].map(n => <PersonSkeleton key={n} />)
                :
                toDisplay.map(person => <PersonCard key={person.email} {...person} />)
            }
        </ContentGrid>
    )
}

export default People