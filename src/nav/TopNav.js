// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'

// MUI Icons
import ShieldIcon from '@mui/icons-material/Shield'

function TopNav(props) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Tooltip
                        title="Home"
                    >
                        <IconButton>
                            <ShieldIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{ flexGrow: 1 }} />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav