// React
import React from 'react'

// MUI
import { Avatar, Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip, useTheme } from '@mui/material'

// MUI Icons
import PlaceIcon from '@mui/icons-material/Place'
import EmailIcon from '@mui/icons-material/Email'
import CallIcon from '@mui/icons-material/Call'
import InfoIcon from '@mui/icons-material/Info'
import LaunchIcon from '@mui/icons-material/Launch'

// router dom
import { Link } from 'react-router-dom'

function LinkButton(props) {
    const { title, to, icon, external } = props

    if (!to) {
        return (
            <Tooltip
                title={title}
            >
                <span>
                    <IconButton
                        aria-label={title}
                        disabled
                    >
                        {icon}
                    </IconButton>
                </span>
            </Tooltip>
        )
    }
    return (
        <Link to={to} target={external ? "_blank" : "_self"}>
            <Tooltip
                title={title}
            >
                <IconButton
                    aria-label={title}
                >
                    {icon}
                </IconButton>
            </Tooltip>
        </Link>
    )
}

function TeamCard(props) {

    const theme = useTheme()

    const {
        name,
        id,
        memberCount,
        address,
        email,
        phone
    } = props

    let addressURL = ""
    if (address) {
        addressURL = `https://www.google.com/maps/place/${encodeURIComponent(address)}`
    }

    let emailURL = ""
    if (email) {
        emailURL = `mailto:${email}`
    }

    let phoneURL = ""
    if (phone) {
        phoneURL = `tel:${phone}`
    }

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title={name}
                    avatar={
                    <Tooltip
                        title="Member Count"
                    >
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.primary.dark
                            }}
                        >
                            {memberCount}
                        </Avatar>
                    </Tooltip>
                }
                />
                <CardActions>
                    <Tooltip
                        title="Quick Info"
                    >
                        <IconButton>
                            <InfoIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <LinkButton
                        title="Details"
                        to={`/teams/${id}`}
                        icon={<LaunchIcon fontSize="large" />}
                    />
                    <Box sx={{flexGrow: 1}} />
                    <LinkButton
                        external
                        title="View Address"
                        to={addressURL}
                        icon={<PlaceIcon fontSize="large" />}
                    />
                    <LinkButton
                        external
                        title="Send Email"
                        to={emailURL}
                        icon={<EmailIcon fontSize="large" />}
                    />
                    <LinkButton
                        external
                        title="Call"
                        to={phoneURL}
                        icon={<CallIcon fontSize="large" />}
                    />
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TeamCard