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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// router 
import { Link } from 'react-router-dom'
import PersonDialog from '../../dialog/PersonDialog'
import UserContext from '../../context/UserContext'
import ConfirmDialog from '../../dialog/ConfirmDialog'
import APIContext from '../../context/APIContext'

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

function AdminActions(props) {
    const {
        id,
        firstName,
        lastName,
        title,
        address,
        email,
        phone,
        supervisor,
        teams
    } = props

    let user = React.useContext(UserContext)
    let apiContext = React.useContext(APIContext)

    const [editOpen, setEditOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)

    if (!user.admin) {
        return null
    }

    function deleteUser() {
        apiContext.api.people.deletePerson(id)
        apiContext.update()
    }

    return (
        <>
            <IconButton
                aria-label="Edit Person"
                onClick={() => setEditOpen(true)}
            >
                <EditIcon fontSize="large" />
            </IconButton>
            <IconButton
                aria-label="Delete Person"
                onClick={() => setDeleteOpen(true)}
            >
                <DeleteIcon fontSize="large" />
            </IconButton>
            <PersonDialog
                open={editOpen}
                close={() => setEditOpen(false)}
                person={{
                    id,
                    firstName,
                    lastName,
                    title,
                    address,
                    phone,
                    email,
                    supervisor,
                    teams
                }}
            />
            <ConfirmDialog
                open={deleteOpen}
                close={() => setDeleteOpen(false)}
                callback={deleteUser}
                text={`Are you sure you want to delete the entry for ${firstName} ${lastName}?`}
            />
        </>
    )

}

function PersonCardActions(props) {
    const {
        id,
        firstName,
        lastName,
        title,
        address,
        email,
        phone,
        supervisor,
        teams
    } = props

    const user = React.useContext(UserContext)

    let addressURL = ""
    if (address) {
        addressURL = `https://www.google.com/maps/place/${encodeURIComponent(address)}`
    }

    // info dialog status
    const [open, setOpen] = React.useState(false)

    return (
        <CardActions>
            {!user.admin ? 
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
            :
            null
            }
            <AdminActions
                id={id}
                firstName={firstName}
                lastName={lastName}
                title={title}
                address={address}
                email={email}
                phone={phone}
                supervisor={supervisor}
                teams={teams}
            />
            <Box sx={{ flexGrow: 1 }} />
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
                    id,
                    firstName,
                    lastName,
                    title,
                    address,
                    phone,
                    email,
                    supervisor,
                    teams
                }}
            />
        </CardActions>
    )
}

function PersonCard(props) {

    const {
        id,
        firstName,
        lastName,
        title,
        address,
        email,
        phone,
        supervisor,
        teams
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
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    title={title}
                    address={address}
                    email={email}
                    phone={phone}
                    supervisor={supervisor}
                    teams={teams}
                />
            </Card>
        </Grid>
    )
}

export default PersonCard