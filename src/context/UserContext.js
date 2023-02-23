// React
import React from 'react'

const demoUser = {
    loggedIn: false,
    username: "DemoUser",
    firstName: "Demo",
    lastName: "User",
    address: "9800 Savage Rd., Suite 6272 Fort George G. Meade",
    phone: "123-456-7890",
    email: "demouser@example.com",
    // functions handled by the provider
    setLoggedIn: /* istanbul ignore next */ status => {},
    setFirstName: /* istanbul ignore next */ name => {},
    setLastName: /* istanbul ignore next */ name => {},
    setAddress: /* istanbul ignore next */ address => {},
    setPhone: /* istanbul ignore next */ phone => {},
    setEmail: /* istanbul ignore next */ email => {}
}

const UserContext = React.createContext(demoUser)

function UserContextProvider(props) {

    const [loggedIn, setLoggedIn] = React.useState(demoUser.loggedIn)
    const [username, setUsername] = React.useState(demoUser.username)
    const [firstName, setFirstName] = React.useState(demoUser.firstName)
    const [lastName, setLastName] = React.useState(demoUser.lastName)
    const [address, setAddress] = React.useState(demoUser.address)
    const [phone, setPhone] = React.useState(demoUser.phone)
    const [email, setEmail] = React.useState(demoUser.email)

    return (
        <UserContext.Provider
            value={{
                loggedIn,
                username,
                firstName,
                lastName,
                address,
                phone,
                email,
                setLoggedIn,
                setFirstName,
                setLastName,
                setAddress,
                setPhone,
                setEmail
            }}
        >
                {props.children}
            </UserContext.Provider>
    )

}

export default UserContext
export {
    UserContextProvider,
    demoUser
}