// React
import React, {Suspense, lazy} from 'react'

// MUI
import { Grid, LinearProgress } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

// lazy loads
const Home = lazy(() => import('./Home'))
const People = lazy(() => import('./people/People'))
const OrgChart = lazy(() => import('./org-chart/OrgChart'))
const Teams = lazy(() => import('./teams/Teams'))
const DetailedTeamPage = lazy(() => import('./teams/DetailedTeamPage'))

function ContentGrid(props) {

    return (
        <Grid
            container
            spacing={1}
            sx={{
                paddingLeft: "7px",
                paddingRight: "7px",
                marginTop: "7px"
            }}
        >
            {props.children}
        </Grid>
    )
}

function Content(props) {

    return (
        <Suspense fallback={<LinearProgress />}>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/people"
                    element={<People />}
                />
                <Route
                    path="/org-chart"
                    element={<OrgChart />}
                />
                <Route
                    path="/teams"
                    element={<Teams />}
                />
                <Route
                    path="/teams/:uuid"
                    element={<DetailedTeamPage />}
                />
            </Routes>
        </Suspense>
    )
}


export default Content
export {
    ContentGrid
}