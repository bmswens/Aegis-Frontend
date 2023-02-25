// React
import React from 'react'

// MUI
import { Grid } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'

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
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
        </Routes>
    )
}


export default Content
export {
    ContentGrid
}