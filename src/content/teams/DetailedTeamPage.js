// React
import React from 'react'

// MUI
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Grid, useMediaQuery, useTheme } from '@mui/material'

// react router
import { useParams } from 'react-router-dom'

// custom 
import { ContentGrid } from '../Content'
import TeamCard from './TeamCard'
import api from '../../api'
import { LoadingSkeleton } from '../people/People'

function PeopleTable(props) {
    const { people } = props
    const columns = [
        {
            field: "firstName",
            headerName: "First Name",
            flex: 0.75
        },
        {
            field: "lastName",
            headerName: "Last Name",
            flex: 0.75
        },
        {
            field: "title",
            headerName: "Title",
            flex: 1
        },
        {
            field: "supervisor",
            headerName: "Supervisor",
            flex: 1
        },
        {
            field: "phone",
            headerName: "Phone",
            flex: 1
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1.5
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        }
    ]

    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down('md'))

    const visibleColumns = {
        title: isSmall ? false : true,
        phone: isSmall ? false : true,
        address: isSmall ? false : true,
        email: isSmall ? false : true,
    }

    return (
        <Grid 
            item 
            xs={12}
            sx={{
                height: "calc(100vh - 65px - 155px)"
            }}
        >
            <DataGrid
                rows={people}
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                initialState={{
                    pagination: { paginationModel: { pageSize: 12 } },
                    columns: {
                        columnVisibilityModel: visibleColumns
                    }
                }}
                pageSizeOptions={[5, 12, 25, 50]}
            />
        </Grid>
    )
}

function DetailedTeamPage(props) {

    const { uuid } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [team, setTeam] = React.useState({})

    React.useEffect(() => {
        async function load() {
            let t = await api.teams.getTeamDetailed(uuid)
            setTeam(t)
            setLoading(false)
        }
        if (loading) {
            load()
        }
    }, [uuid, loading])

    if (loading) {
        return (
            <ContentGrid>
                <LoadingSkeleton />
                <LoadingSkeleton />
            </ContentGrid>
        )
    }

    return (
        <ContentGrid>
            <TeamCard
                noLink
                {...team}
            />
            <PeopleTable
                people={team.people}
            />
        </ContentGrid>
    )
}

export default DetailedTeamPage 