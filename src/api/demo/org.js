import { faker } from '@faker-js/faker'
import { makeFakePerson } from './people'

async function getShortOrgs() {
    let output = []
    for (let i = 0; i < faker.datatype.number({min: 5, max: 42}); i++ ) {
        let fakeOrg = {
            name: `${faker.commerce.department()} Department`,
            id: faker.datatype.uuid()
        }
        output.push(fakeOrg)
    }
    return output
}

function makeMockAdmins() {
    let output = []
    for (let i = 0; i < faker.datatype.number({min: 1, max: 4}); i++ ) {
        let admin = {
            name: faker.name.firstName() + " " + faker.name.lastName(),
            id: faker.datatype.uuid()
        }
        output.push(admin)
    }
    return output
}

function makeMockOrg(seed) {
    return {
        name: `${faker.commerce.department()} Department`,
        id: faker.datatype.uuid(),
        memberCount: faker.datatype.number({min: 4, max: 32}),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        admins: makeMockAdmins(),
        ...seed
    }
}

async function getOrgs() {
    let output = []
    for (let i = 0; i <= faker.datatype.number({min: 4, max: 12}); i++) {
        output.push(makeMockOrg())
    }
    return output
}

// org chart helper functions
function makeChildren(depth=0) {
    let output = []
    /* istanbul ignore if: it's random and only for demo purposes */
    if (depth >= 4) {
        return output
    }
    for (let i = 0; i < faker.datatype.number({min: 1, max: 4}); i++) {
        let fakePerson = makeFakePerson()
        fakePerson.children = makeChildren(depth + 1)
        fakePerson.id = String(faker.datatype.uuid())
        output.push(fakePerson)
    }
    return output
}

async function getOrgChart(orgId) {
    let rootNode = makeFakePerson()
    rootNode.id = orgId
    rootNode.children = makeChildren()
    return rootNode
}

async function getDetailedOrg(uuid) {
    let org = makeMockOrg()
    org.people = []
    for (let i = 0; i < org.memberCount; i++) {
        let person = makeFakePerson()
        if (org.people.length) {
            let supervisor = org.people[faker.datatype.number({min: 0, max: org.people.length - 1})]
            person.supervisor = `${supervisor.firstName} ${supervisor.lastName}`
        }
        else {
            person.supervisor = "Enlisted Jesus"
        }
        org.people.push(person)
    }
    return org
}

const org = {
    getShortOrgs,
    getOrgChart,
    getOrgs,
    getDetailedOrg
}

export default org