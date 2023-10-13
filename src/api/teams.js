
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

const teams = {
    getTeamsSimple,
    getTeamDetailed
}

export default teams