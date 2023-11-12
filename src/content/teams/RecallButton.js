// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip } from '@mui/material'


// MUI Icons
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'

// auth
import { useAuth } from 'react-oidc-context'

// custom 
import api from '../../api'

function RecallDialog(props) {
    const { open, close, id, name } = props
    const auth = useAuth()
    
    // input
    const [title, setTitle] = React.useState('')
    const [text, setText] = React.useState('')

    async function submit() {
        let data = {
            teamId: id,
            title,
            message: text
        }
        let ok = await api.recalls.startRecall(data, auth.user.access_token)
        if (ok) {
            close()
        }
    }

    const isDisabled = title.length === 0 || text.length === 0

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle align="center">
                Start A Recall For {name}
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1}>
                    <TextField
                        label="Recall Title"
                        onChange={event => setTitle(event.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Recall Message"
                        onChange={event => setText(event.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={submit}
                    disabled={isDisabled}
                >
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function RecallButton(props) {

    const {id, name} = props
    const [open, setOpen] = React.useState(false)

    return (
        <>
            <Tooltip
                title="Start A Recall"
            >
                <IconButton
                    onClick={() => setOpen(true)}
                    aria-label="Start A Recall"
                >
                    <PhoneForwardedIcon fontSize="large" />
                </IconButton>
            </Tooltip>
            <RecallDialog
                open={open}
                close={() => setOpen(false)}
                name={name}
                id={id}
            />
        </>
    )

}

export default RecallButton