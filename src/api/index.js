
async function getSelf(token) {
    let resp = await fetch("/api/self", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await resp.json()
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
    updateSelf
}

export default api