// React
import React from 'react'

// MUI
import { Button, Card, CardContent, Grid, Skeleton, TextField } from '@mui/material'

// custom
import { ContentGrid } from '../Content'
import PersonCard from './PersonCard'
import { Stack } from '@mui/system'
import APIContext from '../../context/APIContext'

function SearchBar(props) {
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

function LoadingSkeleton(props) {
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
    const [searching, setSearching] = React.useState(false)
    const [people, setPeople] = React.useState([])
    const [toDisplay, setToDisplay] = React.useState([])
    const apiContext = React.useContext(APIContext)

    React.useEffect(() => {
        setPeople([])
        setToDisplay([])
        setLoading(true)
    }, [apiContext.api, apiContext.lastUpdate])

    React.useEffect(() => {
        async function load() {
            let p = await apiContext.api.people.getPeople()
            setPeople(p)
            setToDisplay(p)
            setLoading(false)
        }
        if (loading) {
            load()
            setLoading(false)
        }
    }, [loading, apiContext.api])

    // search
    // TODO: May slow down if there are too many people.
    // If that happens, switch to server-side searching.
    const [ search, setSearch ] = React.useState('')

    // sets the skeletons so users know something is happening
    React.useEffect(() => {
        setSearching(true)
    }, [search])

    // we're going to use case insensitive search
    React.useEffect(() => {
        if (people && search && searching) {
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
            setSearching(false)
        }
        else if (people && searching && !search) {
            setToDisplay(people)
            setSearching(false)
        }
    }, [people, search, searching, setToDisplay])

    return (
        <ContentGrid>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
            { loading || searching ?
                [1, 2, 3, 4, 5].map(n => <LoadingSkeleton key={n} />)
                :
                toDisplay.map(person => <PersonCard key={person.id} {...person} />)
            }
        </ContentGrid>
    )
}

export default People
export {
    LoadingSkeleton,
    SearchBar
}