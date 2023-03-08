import db from "./db"

async function getPeople() {
    let people = await db.table("people").toArray()
    for (let person of people) {
        if (person.supervisor === 0) {
            person.supervisor = null
        }
        if (person.supervisor) {
            let supervisor = await db.people.where("id").equals(person.supervisor).first()
            /* istanbul ignore else: edge case */
            if (supervisor) { 
                person.supervisor = {
                    name: supervisor.firstName + " " + supervisor.lastName,
                    id: supervisor.id
                }
            }
        }
        if (person.teams) {
            let t = []
            for (let id of person.teams) {
                let team = await db.teams.where("id").equals(id).first()
                /* istanbul ignore else: edge case */
                if (team) {
                    t.push({
                        name: team.name,
                        id: team.id
                    })
                }

            }
            person.teams = t
        }
    }
    return people
}

async function addPerson(person) {
    delete person.id
    if (person.supervisor === null) {
        person.supervisor = 0
    }
    return await db.people.add(person)
}

async function updatePerson(person) {
    /* istanbul ignore else */
    if (person.supervisor === null) {
        person.supervisor = 0
    }
    await db.people.put(person)
}

async function getShortPeople() {
    // there's probably a better way, but wasn't readily apparent in the docs
    let people = await db.table("people").toArray()
    let output = []
    for (let person of people) {
        output.push({
            name: person.firstName + ' ' + person.lastName,
            id: person.id
        })
    }
    return output
}

async function deletePerson(id) {
    await db.people.delete(id)
}

const people = {
    getPeople,
    addPerson,
    getShortPeople,
    updatePerson,
    deletePerson
}

export default people