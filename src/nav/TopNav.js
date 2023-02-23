// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'

// MUI Icons
import ShieldIcon from '@mui/icons-material/Shield'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import UserDialog from '../dialog/UserDialog'

function TopNav(props) {

    const [profileOpen, setProfileOpen] = React.useState(false)
    function close() {
        setProfileOpen(false)
    }

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
                    <Tooltip
                        title="User Profile"
                    >
                        <IconButton
                            onClick={() => setProfileOpen(true)}
                            aria-label="User Profile"
                        >
                            <AccountCircleIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <UserDialog
                open={profileOpen}
                close={close}
            />
        </Box>
    )
}

export default TopNav