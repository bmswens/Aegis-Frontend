
async function getPeopleSimple(token) {
    let resp = await fetch(
        "/api/people/simple",
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    )
    let body = await resp.json()
    return body
}

const people = {
    getPeopleSimple
}

export default people