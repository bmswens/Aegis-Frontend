

async function startRecall(data, token="") {
    let resp = await fetch(
        '/api/recalls',
        {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    )
    return resp.ok
}


const recalls = {
    startRecall
}

export default recalls