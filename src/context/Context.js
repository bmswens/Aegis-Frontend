// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { APIContextProvider } from './APIContext'
import { UserContextProvider } from './UserContext'

function Context(props) {

    return (
        <ThemeContext>
        <UserContextProvider>
            <APIContextProvider>
                {props.children}
            </APIContextProvider>
        </UserContextProvider>
        </ThemeContext>
    )

}

export default Context