// React
import React from 'react'

const demoUser = {
    admin: true,
    loggedIn: false,
    username: "DemoUser",
    firstName: "Demo",
    lastName: "User",
    title: "Aegis User",
    address: "9800 Savage Rd., Suite 6272 Fort George G. Meade",
    phone: "123-456-7890",
    email: "demouser@example.com",
    // functions handled by the provider
    setAdmin: /* istanbul ignore next */ admin => {},
    setUsername: /* istanbul ignore next */ name => {},
    setLoggedIn: /* istanbul ignore next */ status => {},
    setFirstName: /* istanbul ignore next */ name => {},
    setLastName: /* istanbul ignore next */ name => {},
    setTitle: /* istanbul ignore next */ name => {},
    setAddress: /* istanbul ignore next */ address => {},
    setPhone: /* istanbul ignore next */ phone => {},
    setEmail: /* istanbul ignore next */ email => {}
}

const UserContext = React.createContext(demoUser)

function UserContextProvider(props) {

    const [admin, setAdmin] = React.useState(demoUser.admin)
    const [loggedIn, setLoggedIn] = React.useState(demoUser.loggedIn)
    const [username, setUsername] = React.useState(demoUser.username)
    const [firstName, setFirstName] = React.useState(demoUser.firstName)
    const [lastName, setLastName] = React.useState(demoUser.lastName)
    const [title, setTitle] = React.useState(demoUser.title)
    const [address, setAddress] = React.useState(demoUser.address)
    const [phone, setPhone] = React.useState(demoUser.phone)
    const [email, setEmail] = React.useState(demoUser.email)

    return (
        <UserContext.Provider
            value={{
                admin,
                loggedIn,
                username,
                firstName,
                lastName,
                title,
                address,
                phone,
                email,
                setAdmin,
                setUsername,
                setLoggedIn,
                setFirstName,
                setLastName,
                setTitle,
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