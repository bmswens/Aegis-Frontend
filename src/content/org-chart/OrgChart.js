// react
import React from 'react'

// MUI
import { Autocomplete, Card, CardContent, Grid, LinearProgress, TextField } from '@mui/material'

// org chart
import OrganizationChart from "@dabeng/react-orgchart"

// Custom
import { ContentGrid } from '../Content'
import api from '../../api'
import PersonCard from '../people/PersonCard'
import './chart.css'

function OrgChartPersonCard(props) {
    const { nodeData } = props
    return (
        <PersonCard {...nodeData} />
    )
}

function OrgSelection(props) {
    const {
        setData
    } = props

    const [selected, setSelected] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [orgs, setOrgs] = React.useState([])

    React.useEffect(() => {
        async function load() {
            let o = await api.org.getShortOrgs()
            setOrgs(o)
            setLoading(false)
        }
        load()
    }, [])

    React.useEffect(() => {
        setLoading(true)
        setData({})
    }, [selected, setData])

    React.useEffect(() => {
        async function load() {
            let chartData = await api.org.getOrgChart(selected)
            setData(chartData)
            setLoading(false)
        }
        if (loading && selected) {
            load()
        }
    }, [loading, selected, setData])

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