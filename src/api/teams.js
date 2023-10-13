
async function getTeamsSimple() {
    let resp = await fetch(
        "/api/orgs/simple",
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

const teams = {
    getTeamsSimple,
    getTeamDetailed,
    deleteTeam,
    getOrgChart
}

export default teams