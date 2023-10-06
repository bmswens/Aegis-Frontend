// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { APIContextProvider } from './APIContext'
import { UserContextProvider } from './UserContext'
import KeyCloakContext from './KeyCloakContext'

function Context(props) {

    return (
        <KeyCloakContext>
        <ThemeContext>
        <UserContextProvider>
            <APIContextProvider>
                {props.children}
            </APIContextProvider>
        </UserContextProvider>
        </ThemeContext>
        </KeyCloakContext>
    )

}

export default Context