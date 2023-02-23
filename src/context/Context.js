// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { UserContextProvider } from './UserContext'

function Context(props) {

    return (
        <ThemeContext>
        <UserContextProvider>
            {props.children}
        </UserContextProvider>
        </ThemeContext>
    )

}

export default Context