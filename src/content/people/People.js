// React
import React from 'react'

// MUI
import { Grid, Skeleton } from '@mui/material'

// custom
import { ContentGrid } from '../Content'
import PersonCard from './PersonCard'
import api from '../../api'

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

    const [loading, setLoading] = React.useState(true)
    const [people, setPeople] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let p = await api.people.getPeople()
            setPeople(p)
            setLoading(false)
        }
        load()
    }, [])

    return (
        <ContentGrid>
            { loading ?
                [1, 2, 3, 4, 5].map(n => <PersonSkeleton key={n} />)
                :
                people.map(person => <PersonCard key={person.email} {...person} />)
            }
        </ContentGrid>
    )
}

export default People