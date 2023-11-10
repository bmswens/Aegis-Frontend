// React
import React from 'react'

// MUI
import {  Grid, Skeleton } from '@mui/material'

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

export default LoadingSkeleton