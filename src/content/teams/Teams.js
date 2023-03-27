// React
import React from 'react'

// custom
import { ContentGrid } from '../Content'
import { LoadingSkeleton, SearchBar } from '../people/People'
import TeamCard from './TeamCard'
import APIContext from '../../context/APIContext'

function Teams(props) {

    const [loading, setLoading] = React.useState(true)
    const [teams, setTeams] = React.useState([])
    const [toDisplay, setToDisplay] = React.useState([])
    const apiContext = React.useContext(APIContext)

    React.useEffect(() => {
        async function load() {
            let t = await apiContext.api.org.getOrgs()
            setTeams(t)
            setToDisplay(t)
            setLoading(false)
        }
        load()
    }, [apiContext.api.org, apiContext.api.driver, apiContext.lastUpdate])

    // search
    // TODO: Reduce code duplication and merge <People> and <Teams> into abstract search
    // TODO: May slow down if there are too many people.
    // If that happens, switch to server-side searching.
    const [search, setSearch] = React.useState('')

    // sets the skeletons so users know something is happening
    React.useEffect(() => {
        setLoading(true)
    }, [search])

    // we're going to use case insensitive search
    React.useEffect(() => {
        if (teams && search && loading) {
            let lSearch = search.toLowerCase()
            let output = []
            for (let team of teams) {
                if (team.name.toLowerCase().includes(lSearch)) {
                    output.push(team)
                }
                else if (team.email.toLowerCase().includes(lSearch)) {
                    output.push(team)
                }
                else if (team.phone.toLowerCase().includes(lSearch)) {
                    output.push(team)
                }
                else if (team.address.toLowerCase().includes(lSearch)) {
                    output.push(team)
                }
            }
            setToDisplay(output)
            setLoading(false)
        }
        else if (teams && loading && !search) {
            setToDisplay(teams)
            setLoading(false)
        }
    }, [teams, search, loading, setToDisplay])

    return (
        <ContentGrid>
            <SearchBar
                search={search}
                setSearch={setSearch}
            />
            { loading ?
                [1, 2, 3, 4, 5].map(n => <LoadingSkeleton key={n} />)
                :
                toDisplay.map(team => <TeamCard key={team.id} {...team} />)
            }
        </ContentGrid>
    )
}

export default Teams