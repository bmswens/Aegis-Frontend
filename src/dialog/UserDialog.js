// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material'

// MUI icons
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'

// file download
// tests just weren't working
import fileDownload from 'js-file-download'

// custom
import UserContext from '../context/UserContext'
import { importDB, exportDB } from "dexie-export-import"
import APIContext from '../context/APIContext'

function StorageOptions(props) {

    const apiContext = React.useContext(APIContext)

    async function handleDownload() {
        let blob = await exportDB(apiContext.api.db, { prettyJson: true })
        fileDownload(blob, 'aegis.json')
    }

    function clickUpload() {
        let up = document.getElementById("database-input")
        up.click()
    }

    async function handleUpload(event) {
        let file = event.target.files[0]
        await importDB(file, {overwriteValues: true})
    }

    function handleDriver(event) {
        apiContext.setStorageDriver(event.target.value)
    }

    return (
        <>
            <Divider>
                Storage Options
            </Divider>
            <FormControl fullWidth>
                <InputLabel id="storage-driver-label">Storage Driver</InputLabel>
                <Select
                    labelId="storage-driver-label"
                    label="Storage Driver"
                    value={apiContext.storageDriver}
                    onChange={handleDriver}
                >
                    <MenuItem value={"demo"}>Demo</MenuItem>
                    <MenuItem value={"local"}>Local Storage (offline)</MenuItem>
                </Select>
            </FormControl>
            <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
            >
                <Tooltip
                    title="Download Database"
                >
                    <span>
                        <IconButton
                            disabled={apiContext.storageDriver !== "local"}
                            onClick={handleDownload}
                            aria-label="Download Database"
                        >
                            <DownloadIcon fontSize="large" />
                        </IconButton>

                    </span>
                </Tooltip>
                <Tooltip
                    title="Upload Database"
                >
                    <span>
                    <IconButton
                        disabled={apiContext.storageDriver !== "local"}
                        onClick={clickUpload}
                        aria-label="Upload Database"
                    >
                        <UploadIcon fontSize="large" />
                    </IconButton>
                    <input id="database-input" type="file" onChange={handleUpload} style={{display: "none"}} />
                    </span>
                </Tooltip>
            </Stack>
        </>
    )
}

function UserDialog(props) {

    const { open, close } = props
    const userContext = React.useContext(UserContext)
    const apiContext = React.useContext(APIContext)

    const [firstName, setFirstName] = React.useState(userContext.firstName)
    const [lastName, setLastName] = React.useState(userContext.lastName)
    const [title, setTitle] = React.useState(userContext.title)
    const [address, setAddress] = React.useState(userContext.address)
    const [phone, setPhone] = React.useState(userContext.phone)
    const [email, setEmail] = React.useState(userContext.email)

    function handleClose() {
        setFirstName(userContext.firstName)
        setLastName(userContext.lastName)
        setAddress(userContext.address)
        setPhone(userContext.phone)
        setEmail(userContext.email)
        setTitle(userContext.title)
        close()
    }

    function submit() {
        /* istanbul ignore else */
        if (firstName !== userContext.firstName) {
            userContext.setFirstName(firstName)
        }
        if (lastName !== userContext.lastName) {
            userContext.setLastName(lastName)
        }
        if (address !== userContext.address) {
            userContext.setAddress(address)
        }
        if (phone !== userContext.phone) {
            userContext.setPhone(phone)
        }
        if (email !== userContext.email) {
            userContext.setEmail(email)
        }
        if (title !== userContext.title) {
            userContext.setTitle(title)
        }
        close()
    }

    let canSubmit = false
    if (firstName !== userContext.firstName) {
        canSubmit = true
    }
    else if (lastName !== userContext.lastName) {
        canSubmit = true
    }
    else if (address !== userContext.address) {
        canSubmit = true
    }
    else if (phone !== userContext.phone) {
        canSubmit = true
    }
    else if (email !== userContext.email) {
        canSubmit = true
    }
    else if (title !== userContext.title) {
        canSubmit = true
    }

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            open={open}
            onClose={handleClose}
            scroll="body"
        >
            <DialogTitle align="center">
                User Settings
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{ marginTop: 1 }}>
                    {
                        apiContext.storageDriver === "demo" ?
                        <>
                        
                        <TextField
                        label="Username"
                        fullWidth
                        disabled
                        value={userContext.username}
                    />
                    <TextField
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                    <TextField
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={event => setAddress(event.target.value)}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                        </>
                    :
                    <TextField
                        label="Username"
                        fullWidth
                        value="Local Storage User"
                        disabled
                    />
                    }
                    
                    <StorageOptions />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="contained"
                >
                    Cancel
                </Button>
                <Button
                    onClick={submit}
                    disabled={!canSubmit}
                    variant="contained"
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default UserDialog