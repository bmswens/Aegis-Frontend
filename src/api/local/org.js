import db from "./db"

async function getShortOrgs() {
    let teams = await db.table("teams").toArray()
    let output = []
    for (let team of teams) {
        output.push({
            name: team.name,
            id: team.id
        })
    }
    return output
}

async function getOrgs() {
    let teams = await db.table("teams").toArray()
    for (let team of teams) {
        team.admins = []
        let members = await db.people.where("teams").equals(team.id).toArray()
        team.memberCount = members.length
    }
    return teams
}

async function getChildren(id, team) {
    let children = await db.people.where("supervisor").equals(id).and(person => person.teams.includes(team)).toArray()
    for (let child of children) {
        child.children = await getChildren(child.id, team)
    }
    return children
}

async function getOrgChart(id) {
    id = Number(id)
    let org = await db.teams.where("id").equals(id).first()
    if (!org) {
        return {}
    }
    let members = await db.people.where("teams").equals(id).toArray()
    let memberIDs = members.map(member => member.id)
    let rootNode = await db.people.where("supervisor").noneOf(memberIDs).and(person => person.teams.includes(id)).first()
    if (!rootNode) {
        return {}
    }
    rootNode.children = await getChildren(rootNode.id, id)
    return rootNode
}

async function getDetailedOrg(id) {
    id = Number(id)
    let team = await db.teams.where("id").equals(id).first()
    if (!team) {
        return {}
    }
    let members = await db.people.where("teams").equals(id).toArray()
    for (let member of members) {
        if (!member.supervisor) {
            member.supervisor = ""
        }
        else {
            let supervisor = await db.people.where("id").equals(member.supervisor).first()
            member.supervisor = `${supervisor.firstName} ${supervisor.lastName}`
        }
    }
    team.people = members
    team.memberCount = members.length
    return team
}

async function addTeam(team) {
    delete team.id
    return await db.teams.add(team)
}

async function editTeam(team) {
    await db.teams.put(team)
}

async function deleteTeam(id) {
    await db.teams.delete(id)
}

const org = {
    getShortOrgs,
    getOrgChart,
    getOrgs,
    getDetailedOrg,
    addTeam,
    editTeam,
    deleteTeam
}

export default org