
async function getSelf(token) {
    let resp = await fetch("/api/self", {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return await resp.json()
}

const api = {
    getSelf
}

export default api