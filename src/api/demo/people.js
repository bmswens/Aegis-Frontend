import { faker } from '@faker-js/faker'

function makeFakePerson(seed) {

    return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        title: faker.name.jobTitle(),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.stateAbbr()}`,
        email: faker.internet.email(),
        phone: faker.phone.number(),
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

const people = {
    getPeople
}

export default people