// react
import React from 'react'

// MUI
import { useTheme } from '@emotion/react'
import { Autocomplete, Box, Card, CardActions, CardContent, Grid, IconButton, LinearProgress, TextField, useMediaQuery } from '@mui/material'

// MUI Icons
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import ZoomInIcon from '@mui/icons-material/ZoomIn'

// org chart
import OrganizationChart from "@dabeng/react-orgchart"

// Custom
import { ContentGrid } from '../Content'
import APIContext from '../../context/APIContext'
import PersonCard from '../people/PersonCard'
import './chart.css'

function OrgChartPersonCard(props) {
    const { nodeData } = props
    return (
        <PersonCard {...nodeData} />
    )
}

function ZoomSection(props) {
    // We're lumping small screens and mobile together
    const { data } = props
    const theme = useTheme()
    const isSmall = useMediaQuery(theme.breakpoints.down("md"))

    const [scale, setScale] = React.useState(isSmall ? 0.4 : 1)

    React.useEffect(() => {
        if (!isSmall) {
            return
        }
        let nodes = document.getElementsByClassName("orgchart chart")
        if (!nodes.length) {
            return
        }
        let chart = nodes[0]
        chart.style.transform = `matrix(${scale}, 0, 0, ${scale}, 0, 0)`
    }, [scale, isSmall])

    React.useEffect(() => {
        if (!isSmall) {
            return
        }
    }, [data, setScale, isSmall])

    if (!isSmall) {
        return null
    }

    return (
        <CardActions>
            <Box sx={{flexGrow: 1}} />
            <IconButton
                aria-label="Zoom Out"
                onClick={() => setScale(scale - 0.1)}
                disabled={!data.firstName || scale <= 0.2}
            >
                <ZoomOutIcon fontSize="large" />
            </IconButton>
            <IconButton
                aria-label="Zoom In"
                disabled={!data.firstName}
                onClick={() => setScale(scale + 0.1)}
            >
                <ZoomInIcon fontSize="large" />
            </IconButton>
        </CardActions>
    )
}

function OrgSelection(props) {
    const {
        data,
        setData
    } = props

    const [selected, setSelected] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [orgs, setOrgs] = React.useState([])
    const { api } = React.useContext(APIContext)

    React.useEffect(() => {
        async function load() {
            let o = await api.org.getShortOrgs()
            setOrgs(o)
            setLoading(false)
        }
        load()
    }, [api.org, api.driver])

    React.useEffect(() => {
        setLoading(true)
        setData({})
    }, [selected, setData])

    React.useEffect(() => {
        async function load() {
            let chartData = await api.org.getOrgChart(selected.id)
            setData(chartData)
            setLoading(false)
        }
        if (loading && selected) {
            load()
        }
        else if (loading && !selected) {
            setLoading(false)
        }
    }, [loading, selected, setData, api.org, api.driver])

    return (
        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Autocomplete
                        fullWidth
                        value={selected}
                        onChange={(event, newValue) => setSelected(newValue)}
                        options={orgs}
                        getOptionLabel={option => option.name}
                        renderInput={params => <TextField {...params} label="Team" />}
                    />
                </CardContent>
                <ZoomSection
                    data={data}
                />
                {loading ? <LinearProgress /> : null}
            </Card>
        </Grid>
    )
}

function OrgChart(props) {

    const [data, setData] = React.useState({})

    return (
        <ContentGrid>
            <OrgSelection
                data={data}
                setData={setData}
            />
            { data.firstName ?
                <OrganizationChart
                    chartClass="chart"
                    datasource={data}
                    NodeTemplate={OrgChartPersonCard}
                    pan
                    zoom
                    collapsible={false}
                />
                :
                null
            }
        </ContentGrid>
    )
}

export default OrgChart