import db from "./db";
import org from "./org";
import people from "./people";

describe('getPeople()', function() {
    beforeEach(async () => {
        let teamID = await org.addTeam({name: "Team"})
        let bossID = await people.addPerson({firstName: "Brandon", lastName: "Swenson", supervisor: null, teams: [teamID]})
        await people.addPerson({firstName: "Joe", supervisor: bossID})
    })
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should return a list of people", async function() {
        let p = await people.getPeople()
        expect(p).toHaveLength(2)
    })
    it("should null empty supervisors", async function() {
        let p = await people.getPeople()
        for (let person of p) {
            if (person.firstName === "Brandon") {
                expect(person.supervisor).toEqual(null)
            }
        }
    })
    it("should format existing supervisors", async function() {
        let p = await people.getPeople()
        for (let person of p) {
            if (person.firstName === "Joe") {
                expect(person.supervisor.name).toEqual("Brandon Swenson")
            }
        }
    })
    it("should format teams", async function() {
        let p = await people.getPeople()
        for (let person of p) {
            if (person.firstName === "Brandon") {
                expect(person.teams[0].name).toEqual("Team")
            }
        }
    })
})

describe('basic CRUD', function() {
    let id
    beforeEach(async () => {
        id = await people.addPerson({firstName: "Brandon", lastName: "Swenson", supervisor: null, teams: []})
    })
    afterEach(() => {
        db.table("teams").clear()
        db.table("people").clear()
    })
    it("should be able to update", async function() {
        await people.updatePerson({id: id, firstName: "Brandon", lastName: "Svenson", supervisor: null})
        let p = await people.getShortPeople()
        expect(p[0].name).toEqual("Brandon Svenson")
    })
    it("should be able to delete", async function() {
        await people.deletePerson(id)
        let p = await people.getShortPeople()
        expect(p).toHaveLength(0)
    })
})