import db from './db'
import org from './org'
import people from './people'

describe('getShortOrgs()', function() {
    beforeEach(() => {
        org.addTeam({name: "team"})
    })
    afterEach(() => {
        db.table("teams").clear()
    })
    it("should return an array of teams with just name and id", async function() {
        let shortTeams = await org.getShortOrgs()
        expect(shortTeams).toHaveLength(1)
        expect(shortTeams[0].name).toEqual("team")
        expect(shortTeams[0].phone).toBeUndefined()
    })
})

describe("getOrgs()", function() {
    beforeEach(() => {
        org.addTeam({name: "team", phone: "911"})
    })
    afterEach(() => {
        db.table("teams").clear()
    })
    it("should return an array of teams with just", async function() {
        let shortTeams = await org.getOrgs()
        expect(shortTeams).toHaveLength(1)
        expect(shortTeams[0].name).toEqual("team")
        expect(shortTeams[0].phone).toEqual("911")
    })
})

describe('getOrgChart() no org', function() {
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should return an empty object", async function() {
        let rootNode = await org.getOrgChart(1)
        expect(rootNode).toEqual({})
    })
})


describe('getOrgChart() no people', function() {
    let id
    beforeEach(async () => {
        id = await org.addTeam({name: "team"})
    })
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should return an empty object", async function() {
        let rootNode = await org.getOrgChart(id)
        expect(rootNode).toEqual({})
    })
})

describe('getOrgChart()', function() {
    let id 
    beforeEach(async () => {
        id = await org.addTeam({name: "team"})
        let personId = await people.addPerson({firstName: "Bob", supervisor: null, teams: [id]})
        await people.addPerson({firstName: "Joe", supervisor: personId, teams: [id]})
    })
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should return a rootNode with children", async function() {
        let rootNode = await org.getOrgChart(id)
        expect(rootNode.firstName).toEqual("Bob")
        expect(rootNode.children).toHaveLength(1)
        expect(rootNode.children[0].firstName).toEqual("Joe")
    })
})

describe('getDetailedOrg() no team', function() {
    it("should return empty object", async function() {
        let obj = await org.getDetailedOrg(-1)
        expect(obj).toEqual({})
    })
})

describe("getDetailedOrg()", function() {
    let id 
    beforeEach(async () => {
        id = await org.addTeam({name: "team"})
        let personId = await people.addPerson({firstName: "Bob", lastName: "Bobbert", supervisor: null, teams: [id]})
        await people.addPerson({firstName: "Joe", supervisor: personId, teams: [id]})
    })
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should fill in the supervisor as string", async function() {
        let team = await org.getDetailedOrg(id)
        expect(team.memberCount).toEqual(2)
        for (let member of team.people) {
            if (member.firstName === "Bob") {
                expect(member.supervisor).toEqual("")
            }
            else if (member.firstName === "Joe") {
                expect(member.supervisor).toEqual("Bob Bobbert")
            }
        }
    })
})

describe("org CRUD", function() {
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should do standard CRUD", async function() {
        let id = await org.addTeam({name: "Team"})
        await org.editTeam({id: id, name: "Edited Team"})
        let teams = await org.getShortOrgs()
        for (let team of teams) {
            if (team.id === id) {
                expect(team.name).toEqual("Edited Team")
            }
        }
        org.deleteTeam(id)
        teams = await org.getShortOrgs()
        expect(teams).toHaveLength(0)
    })
})