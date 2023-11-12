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
import CheckIcon from '@mui/icons-material/Check'
import StarIcon from '@mui/icons-material/Star'
import GroupAddIcon from '@mui/icons-material/GroupAdd'


// router dom
import { Link } from 'react-router-dom'

// auth
import { useAuth } from 'react-oidc-context'

// custom
import TeamQuickInfoDialog from './TeamQuickInfoDialog'
import TeamDialog from '../../dialog/TeamDialog'
import ConfirmDialog from '../../dialog/ConfirmDialog'
import api from '../../api'
import PendingMembersButton from './PendingMembersButton'
import RecallButton from './RecallButton'


function AdminActions(props) {

    const { team } = props

    const [editOpen, setEditOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)

    async function deleteTeam() {
        await api.teams.deleteTeam(team.id)
    }

    return (
        <>
            <RecallButton
                id={team.id}
                name={team.name}
            />
            <PendingMembersButton
                id={team.id}
                name={team.name}
            />
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

function MemberActions(props) {

}


function NonMemberActions(props) {

    const auth = useAuth()
    const { id, name } = props
    const [open, setOpen] = React.useState(false)

    async function requestJoin() {
        await api.teams.joinTeam(id, auth.user.access_token)
    }

    return (
        <>
        <Tooltip
            title="Join Team"
        >
            <IconButton
                onClick={() => setOpen(true)}
                aria-label="Join Team"
            >
                <GroupAddIcon fontSize="large" />
            </IconButton>
        </Tooltip>
        <ConfirmDialog
            open={open}
            close={() => setOpen(false)}
            text={`Request to join the ${name} team?`}
            callback={requestJoin}
        />
        </>
    )

}

function MembershipActionSection(props) {
    const auth = useAuth()
    const { membership, team } = props
    if (!auth.isAuthenticated) {
        return null
    }
    if (membership === "admin") {
        return (
            <AdminActions
                team={team}
            />
        )
    }
    else if (membership === "member") {
        return (
            <MemberActions
                id={team.id}
            />
        )
    }
    else {
        return (
            <NonMemberActions
                id={team.id}
                name={team.name}
            />
        )
    }
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


function MemberStatusIcon(props) {

    const theme = useTheme()

    const { membership } = props

    // default to a person not being a member, and update on fetch

    let style = {
        title: "Not A Member",
        color: theme.palette.info.dark,
        icon: "-"
    }
    const styling = {
        "member": {
            title: "Member",
            color: theme.palette.success.dark,
            icon: <CheckIcon data-testid="Member" fontSize="large" />
        },
        "admin": {
            title: "Admin",
            color: theme.palette.warning.dark,
            icon: <StarIcon data-testid="Admin" fontSize="large" />
        }
    }

    if (membership) {
        style = styling[membership]
    }

    return (
        <Tooltip
            title={style.title}
        >
            <Avatar
                sx={{
                    bgcolor: style.color
                }}
            >
                {style.icon}
            </Avatar>
        </Tooltip>
    )
}

function TeamCard(props) {

    const theme = useTheme()
    const auth = useAuth()

    const {
        name,
        id,
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

    // membership/admin info
    const [membership, setMembership] = React.useState(false)
    React.useEffect(() => {
        async function load() {
            let resp = await api.teams.getMemberStatus(id, auth.user.access_token)
            if (resp.status === "member") {
                setMembership("member")
            }
            else if (resp.status === "admin") {
                setMembership("admin")
            }
            else {
                setMembership(false)
            }
        }
        load()
    }, [id, auth])

    return (
        <Grid item xs={12}>
            <Card>
                <CardHeader
                    title={name}
                    titleTypographyProps={{
                        variant: "h5"
                    }}
                    avatar={
                        <MemberStatusIcon
                            id={id}
                            membership={membership}
                        />
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
                    {noLink ? null :
                        <LinkButton
                            title="Details"
                            to={`/teams/${id}`}
                            icon={<LaunchIcon fontSize="large" />}
                        />
                    }
                    <MembershipActionSection
                        team={{
                            id,
                            name,
                            address,
                            phone,
                            email
                        }}
                        membership={membership}
                    />
                    <Box sx={{ flexGrow: 1 }} />
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