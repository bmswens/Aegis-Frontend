
async function getOrgsSimple() {
    let resp = await fetch(
        "/api/orgs/simple",
    )
    let body = await resp.json()
    return body
}

const org = {
    getOrgsSimple
}

export default org