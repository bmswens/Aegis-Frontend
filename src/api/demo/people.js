import { faker } from '@faker-js/faker'

function makeFakePerson(seed) {

    return {
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        title: faker.name.jobTitle(),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        supervisor: null,
        team: null,
        ...seed
    }
}

async function getPeople() {
    let output = []
    for (let i = 0; i < faker.datatype.number({min: 5, max: 42}); i++) {
        let fakePerson = makeFakePerson()
        output.push(fakePerson)
    }
    return output
}

async function addPerson(person) {
    return faker.datatype.uuid()
}

async function updatePerson(person) {
    return true
}

async function getShortPeople() {
    let output = []
    for (let i = 0; i < faker.datatype.number({min: 5, max: 42}); i++) {
        let fakePerson = makeFakePerson()
        output.push({
            name: fakePerson.firstName + ' ' + fakePerson.lastName,
            id: fakePerson.id
        })
    }
    return output
}

const people = {
    getPeople,
    addPerson,
    getShortPeople,
    updatePerson
}

export default people
export {
    makeFakePerson
}