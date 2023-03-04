import { faker } from '@faker-js/faker'
import { makeFakePerson } from './people'

async function getShortOrgs() {
    let output = [
        {
            name: "Demo Org",
            id: faker.datatype.uuid()
        }
    ]
    for (let i = 0; i < faker.datatype.number({min: 5, max: 42}); i++ ) {
        let fakeOrg = {
            name: faker.company.name(),
            id: faker.datatype.uuid()
        }
        output.push(fakeOrg)
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

const org = {
    getShortOrgs,
    getOrgChart
}

export default org