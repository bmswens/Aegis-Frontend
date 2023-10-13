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
        `/api/teams/${uuid}/detailed`,
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    let body = await resp.json()
    return body
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
    let resp = await fetch(
        `/api/teams/create`,
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`
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
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
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
    editTeam
}

export default teams