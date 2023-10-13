import people from "./people"
import teams from './teams'

async function getSelf(token) {
    let resp = await fetch("/api/self", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    let body = await resp.json()
    return body
}

async function updateSelf(body, token) {
    let resp = await fetch("/api/self", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    return resp.ok
}

const api = {
    getSelf,
    updateSelf,
    people,
    teams
}

export default api