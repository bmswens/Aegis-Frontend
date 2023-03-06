// React
import React from 'react'

// MUI
import { Box, Card, CardActions, CardHeader, Grid, IconButton, Tooltip } from '@mui/material'

// MUI Icons
import PlaceIcon from '@mui/icons-material/Place'
import EmailIcon from '@mui/icons-material/Email'
import SmsIcon from '@mui/icons-material/Sms'
import CallIcon from '@mui/icons-material/Call'
import InfoIcon from '@mui/icons-material/Info'

// router 
import { Link } from 'react-router-dom'
import PersonDialog from '../../dialog/PersonDialog'

function LinkButton(props) {
    const {
        title,
        url,
        children
    } = props

    return (
        <Link to={url} target="_blank">
                <Tooltip
                    title={title}
                >
                    <IconButton
                        aria-label={title}
                    >
                        {children}
                    </IconButton>
                </Tooltip>
            </Link>
    )
}

function PersonCardActions(props) {
    const {
        firstName,
        lastName,
        title,
        address,
        email,
        phone,
        supervisor,
        team
    } = props

    let addressURL = ""
    if (address) {
        addressURL = `https://www.google.com/maps/place/${encodeURIComponent(address)}`
    }

    // info dialog status
    const [open, setOpen] = React.useState(false)

    return (
        <CardActions>
            <Tooltip
                title="More Info"
            >
                <IconButton
                    aria-label="More Info"
                    onClick={() => setOpen(true)}
                >
                    <InfoIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <Box sx={{flexGrow: 1}} />
            <LinkButton
                title="View Address"
                url={addressURL}
            >
                <PlaceIcon fontSize="large" />
            </LinkButton>
            <LinkButton
                title="Send Email"
                url={`mailto:${email}`}
            >
                <EmailIcon fontSize="large" />
            </LinkButton>
            <LinkButton
                title="Send Text"
                url={`sms:${phone}`}
            >
                <SmsIcon fontSize="large" />
            </LinkButton>
            <LinkButton
                title="Call"
                url={`tel:${phone}`}
            >
                <CallIcon fontSize="large" />
            </LinkButton>
            {/* Dialogs */}
            <PersonDialog
                open={open}
                close={() => setOpen(false)}
                viewOnly
                person={{
                    firstName,
                    lastName,
                    title,
                    address,
                    phone,
                    email,
                    supervisor,
                    team
                }}
            />
        </CardActions>
    )
}

function PersonCard(props) {

    const {
        firstName,
        lastName,
        title,
        address,
        email,
        phone,
        supervisor,
        team
    } = props
    
    return (
        <Grid item xs={12}>
            <Card
            >
                <CardHeader
                    title={`${firstName} ${lastName}`}
                    subheader={title}
                />
                <PersonCardActions
                    firstName={firstName}
                    lastName={lastName}
                    title={title}
                    address={address}
                    email={email}
                    phone={phone}
                    supervisor={supervisor}
                    team={team}
                />
            </Card>
        </Grid>
    )
}

export default PersonCard