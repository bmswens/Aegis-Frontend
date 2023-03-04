// React
import React from 'react'

// custom
import { ContentGrid } from '../Content'
import { LoadingSkeleton } from '../people/People'
import TeamCard from './TeamCard'
import api from '../../api'

function Teams(props) {

    const [loading, setLoading] = React.useState(true)
    //const [teams, setTeams] = React.useState([])
    const [toDisplay, setToDisplay] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let t = await api.org.getOrgs()
            // setTeams(t)
            setToDisplay(t)
            setLoading(false)
        }
        load()
    }, [])

    return (
        <ContentGrid>
            { loading ?
                [1, 2, 3, 4, 5].map(n => <LoadingSkeleton key={n} />)
                :
                toDisplay.map(team => <TeamCard key={team.id} {...team} />)
            }
        </ContentGrid>
    )
}

export default Teams