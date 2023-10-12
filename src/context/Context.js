// React
import React from 'react'

// custom
import ThemeContext from './ThemeContext'
import { UserContextProvider } from './UserContext'
import AuthContext from './AuthContext'

function Context(props) {

    return (
        <AuthContext>
            <ThemeContext>
                <UserContextProvider>
                    {props.children}
                </UserContextProvider>
            </ThemeContext>
        </AuthContext>
    )

}

export default Context