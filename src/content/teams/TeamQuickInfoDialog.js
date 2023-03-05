// React
import React from 'react'

// MUI
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, TextField } from '@mui/material'

function AdminChip(props) {
    const {
        name,
        id
    } = props

    return (
        <Chip
            label={name}
            color="primary"
            component="a"
            href={`/people?search=${id}`}
            clickable
        />
    )
}

function TeamQuickInfoDialog(props) {
    const {
        open,
        close,
        name,
        address,
        email,
        phone,
        admins
    } = props

    const adminList = admins || []

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Team Info
            </DialogTitle>
            <DialogContent>
                <Stack
                    spacing={1}
                    sx={{
                        marginTop: 1
                    }}
                >
                    <TextField
                        disabled
                        fullWidth
                        label="Name"
                        value={name}
                    />
                    <TextField
                        disabled
                        fullWidth
                        label="Address"
                        value={address}
                    />
                    <TextField
                        disabled
                        fullWidth
                        label="Email"
                        value={email}
                    />
                    <TextField
                        disabled
                        fullWidth
                        label="Phone"
                        value={phone}
                    />
                    <Divider>Admins</Divider>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {adminList.map(admin => <AdminChip key={admin.id} {...admin} />)}
                    </Stack>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TeamQuickInfoDialog