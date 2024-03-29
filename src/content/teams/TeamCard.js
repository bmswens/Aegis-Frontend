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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

// router dom
import { Link } from 'react-router-dom'
import TeamQuickInfoDialog from './TeamQuickInfoDialog'
import UserContext from '../../context/UserContext'
import TeamDialog from '../../dialog/TeamDialog'
import ConfirmDialog from '../../dialog/ConfirmDialog'
import APIContext from '../../context/APIContext'

function AdminActions(props) {

    const { team } = props
    const user = React.useContext(UserContext)
    const apiContext = React.useContext(APIContext)

    const [editOpen, setEditOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)

    async function deleteTeam() {
        await apiContext.api.org.deleteTeam(team.id)
        apiContext.update()
    }

    if (!user.admin) {
        return null
    }

    return (
        <>
            <IconButton
                aria-label="Edit Team"
                onClick={() => setEditOpen(true)}
            >
                <EditIcon fontSize="large" />
            </IconButton>
            <IconButton
                aria-label="Delete Team"
                onClick={() => setDeleteOpen(true)}
            >
                <DeleteIcon fontSize="large" />
            </IconButton>
            <TeamDialog
                open={editOpen}
                close={() => setEditOpen(false)}
                team={team}
            />
            <ConfirmDialog
                open={deleteOpen}
                close={() => setDeleteOpen(false)}
                callback={deleteTeam}
                text={`Are you sure you want to delete the entry for ${team.name}?`}
            />
        </>
    )
}

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
        phone,
        admins,
        noLink
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

    // dialog
    const [infoOpen, setInfoOpen] = React.useState(false)

    React.useEffect(() => {
        return () => setInfoOpen(false)
    }, [])

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title={name}
                    titleTypographyProps={{
                        variant: "h5"
                    }}
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
                        title="More Info"
                    >
                        <IconButton
                            onClick={() => setInfoOpen(true)}
                        >
                            <InfoIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    { noLink ? null : 
                        <LinkButton
                            title="Details"
                            to={`/teams/${id}`}
                            icon={<LaunchIcon fontSize="large" />}
                        />
                    }
                    <AdminActions
                        team={{
                            id,
                            name,
                            address,
                            phone,
                            email
                        }}
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
            <TeamQuickInfoDialog
                open={infoOpen}
                close={() => setInfoOpen(false)}
                name={name}
                address={address}
                email={email}
                phone={phone}
                admins={admins}
            />
        </Grid>
    )
}

export default TeamCard