// dexie
import Dexie from 'dexie';

const db = new Dexie("aegis")

db.version(1).stores({
    people: "++id, firstName, lastName, title, address, email, phone, supervisor, team",
    teams: "++id, name, address, email, phone"
})

db.version(2).stores({
    people: "++id, firstName, lastName, title, address, email, phone, supervisor, *teams",
    teams: "++id, name, address, email, phone"
}).upgrade(trans => {
    return trans.people.toCollection().modify(person => {
        if (person.team) {
            person.teams = [person.team]
        }
        else {
            person.teams = []
        }
        delete person.team
    })
})

export default db