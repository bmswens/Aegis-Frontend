// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { APIContextProvider } from './APIContext'
import { UserContextProvider } from './UserContext'
import AuthContext from './AuthContext'

function Context(props) {

    return (
        <AuthContext>
        <ThemeContext>
        <UserContextProvider>
            <APIContextProvider>
                {props.children}
            </APIContextProvider>
        </UserContextProvider>
        </ThemeContext>
        </AuthContext>
    )

}

export default Context