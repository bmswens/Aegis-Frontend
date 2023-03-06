// React
import React from 'react'

// MUI
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'

// MUI Icons
import GroupsIcon from '@mui/icons-material/Groups'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import LanIcon from '@mui/icons-material/Lan'
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg'
import InfoIcon from '@mui/icons-material/Info'
import GitHubIcon from '@mui/icons-material/GitHub'
import SettingsIcon from '@mui/icons-material/Settings'

// React Router
import { Link } from 'react-router-dom'

// custom
import { ContentGrid } from './Content'
import UserDialog from '../dialog/UserDialog';
import NewPersonDialog from '../dialog/NewPersonDialog'
import TeamDialog from '../dialog/TeamDialog'


function AppButton(props) {

    const {
        disabled,
        icon,
        title,
        link,
        external,
        onClick
    } = props

    if (disabled) {
        return (
            <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
                <Stack>
                    <Tooltip
                        title={"Coming Soon!" }
                    >
                        <span>
                            <IconButton
                                disabled={disabled}
                                aria-label={title}
                            >
                                {icon}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography align="center">
                        {title}
                    </Typography>
                </Stack>
            </Grid>
        )
    }
    return (
        <Grid item xs={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Link to={link} style={{ textDecoration: "none", color: "inherit" }} target={external ? "_blank" : "_self"}>
                <Stack>
                    <Tooltip
                        title={title}
                    >
                        <span>
                            <IconButton
                                disabled={disabled}
                                aria-label={title}
                                onClick={onClick}
                            >
                                {icon}
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Typography align="center">
                        {title}
                    </Typography>
                </Stack>
            </Link>
        </Grid>
    )
}

function Home(props) {

    const [addPersonOpen, setAddPersonOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [teamOpen, setTeamOpen] = React.useState(false)
    function close() {
        setTeamOpen(false)
        setAddPersonOpen(false)
        setSettingsOpen(false)
    }

    return (
        <ContentGrid>
            <AppButton
                title="People"
                icon={<PeopleAltIcon sx={{ fontSize: "20vmin" }} />}
                link="/people"
            />
            <AppButton
                title="Org Chart"
                icon={<LanIcon sx={{ fontSize: "20vmin" }} />}
                link="/org-chart"
            />
            <AppButton
                title="Add Person"
                icon={<PersonAddIcon sx={{ fontSize: "20vmin" }} />}
                onClick={() => setAddPersonOpen(true)}
            />
            <AppButton
                title="Teams"
                icon={<GroupsIcon sx={{ fontSize: "20vmin" }} />}
                link="/teams"
            />
            <AppButton
                title="Add Team"
                icon={<GroupAddIcon sx={{ fontSize: "20vmin" }} />}
                onClick={() => setTeamOpen(true)}
            />
            <AppButton
                disabled
                title="Recalls"
                icon={<PermPhoneMsgIcon sx={{ fontSize: "20vmin" }} />}
                link="/recalls"
            />
            <AppButton
                disabled
                title="More Info"
                icon={<InfoIcon sx={{ fontSize: "20vmin" }} />}
                link="/more-info"
            />
            <AppButton
                title="View Code"
                icon={<GitHubIcon sx={{ fontSize: "20vmin" }} />}
                link="https://github.com/bmswens/Aegis-Frontend"
                external
            />
            <AppButton
                title="Settings"
                icon={<SettingsIcon sx={{ fontSize: "20vmin" }} />}
                onClick={() => setSettingsOpen(true)}
            />
            {/* Dialogs */}
            <UserDialog
                open={settingsOpen}
                close={close}
            />
            <NewPersonDialog
                open={addPersonOpen}
                close={close}
            />
            <TeamDialog
                open={teamOpen}
                close={close}
            />
        </ContentGrid>
    )
}

export default Home