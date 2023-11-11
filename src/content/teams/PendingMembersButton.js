// React
import React from 'react'

// MUI
import { Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip, Typography } from '@mui/material'

// MUI Icons
import HowToRegIcon from '@mui/icons-material/HowToReg'

// auth
import { useAuth } from 'react-oidc-context'
import api from '../../api'

function PendingMember(props) {
    const {firstName, lastName, email, teamId, memberId} = props
    const auth = useAuth()
    const [disabled, setDisabled] = React.useState(false)

    async function handleClick() {
        let ok = await api.teams.approveMember(teamId, memberId, auth.user.access_token)
        if (ok) {
            setDisabled(true)
        }
    }

    return (
        <Stack direction="row" spacing={1}>
            <Box>
                <Typography>{firstName} {lastName}</Typography>
                <Typography variant="body2">{email}</Typography>
            </Box>
            <Box sx={{flexGrow: 1}} />
            <Button
                variant='contained'
                disabled={disabled}
                onClick={handleClick}
            >
                Approve
            </Button>
        </Stack>
    )
}


function PendingMembersDialog(props) {
    const {open, close, members, name, id} = props

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle align="center">
                Pending Members For {name}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    {members.length === 0 ? <Typography align="center" variant="h6">You're all caught up!</Typography> : null}
                    {
                        Array.isArray(members) ?
                        members.map(member => <PendingMember key={member.id} firstName={member.firstName} lastName={member.lastName} email={member.email} teamId={id} memberId={member.id} />)
                        :
                        null
                    }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function PendingMembersButton(props) {
    const { id, name } = props
    const auth = useAuth()
    const [open, setOpen] = React.useState(false)

    // get current list
    const [toApprove, setToApprove] = React.useState([])
    React.useEffect(() => {
        async function load() {
            let temp = await api.teams.getPendingMembers(id, auth.user.access_token)
            setToApprove(temp)
        }
        load()
    }, [id])

    return (
        <>
            <Tooltip
                title="Approve New Members"
            >
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <Badge badgeContent={toApprove.length} color="primary">
                        <HowToRegIcon fontSize="large" />
                    </Badge>
                </IconButton>
            </Tooltip>
            <PendingMembersDialog
                open={open}
                close={() => setOpen(false)}
                members={toApprove}
                name={name}
                id={id}
            />
        </>
    )

}

export default PendingMembersButton