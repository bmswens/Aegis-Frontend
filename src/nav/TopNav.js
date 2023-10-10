// React
import React from 'react'

// MUI
import { AppBar, Box, IconButton, Toolbar, Tooltip } from '@mui/material'

// keycloak
import { useAuth } from 'react-oidc-context'


// MUI Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

// router
import { Link } from 'react-router-dom'

// custom
import AccountDialog from '../dialog/AccountDialog'
import LoginDialog from '../dialog/LoginDialog'

function AccountButton(props) {

    const auth = useAuth()
    const [loginOpen, setLoginOpen] = React.useState(false)
    const [accountOpen, setAccountOpen] = React.useState(false)

    function handleClick() {
        if (auth.isAuthenticated) {
            setAccountOpen(true)
        }
        else {
            setLoginOpen(true)
        }
    }

    return (
        <>
            <Tooltip
                title="Account"
            >
                <IconButton
                    onClick={handleClick}
                    aria-label="Account"
                >
                    <AccountCircleIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <AccountDialog
                open={accountOpen}
                close={() => setAccountOpen(false)}
            />
            <LoginDialog
                open={loginOpen}
                close={() => setLoginOpen(false)}
            />
        </>
    )

}


function TopNav(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
            >
                <Toolbar>
                    <Link to="/">
                        <Tooltip
                            title="Home"
                        >
                            <IconButton
                                aria-label="Home"
                            >
                                <Box
                                    component="img"
                                    src={process.env.PUBLIC_URL + "/logo512-light.png"}
                                    sx={{
                                        height: "36px",
                                        width: "36px"
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <AccountButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default TopNav