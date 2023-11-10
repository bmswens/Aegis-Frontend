async function getTeams() {
    let resp = await fetch(
        "/api/teams",
    )
    let body = await resp.json()
    return body
}


async function getTeamsSimple() {
    let resp = await fetch(
        "/api/teams/simple",
    )
    let body = await resp.json()
    return body
}

async function getTeamDetailed(uuid, token="") {
    let resp = await fetch(
        `/api/teams/${uuid}`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    let team = await resp.json()
    resp = await fetch(
        `/api/teams/${uuid}/members`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    let members = await resp.json()
    team.members = members
    return team
}

async function deleteTeam(uuid, token="") {
    let resp = await fetch(
        `/api/teams/${uuid}`,
        {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    return resp.ok
}

async function getOrgChart(uuid, token="") {
    let resp = await fetch(
        `/api/teams/${uuid}/chart`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    let body = await resp.json()
    return body
}

async function createTeam(data, token="") {
    delete data.id
    let resp = await fetch(
        `/api/teams`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"

            },
            body: JSON.stringify(data)
        }
    )
    let body = await resp.json()
    return body
}

async function editTeam(data, token="") {
    let resp = await fetch(
        `/api/teams/${data.id}`,
        {
            method: "PUT",
            headers: {
                authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    let body = await resp.json()
    return body
}


async function getMemberStatus(teamId, token="") {
    let resp = await fetch(
        `/api/teams/${teamId}/membership`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            }
        }
    )
    let body = await resp.json()
    return body
}

const teams = {
    getTeamsSimple,
    getTeamDetailed,
    deleteTeam,
    getOrgChart,
    getTeams,
    createTeam,
    editTeam,
    getMemberStatus
}

export default teams