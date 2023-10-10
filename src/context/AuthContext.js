// React
import React from 'react'

// oidc
import { AuthProvider } from "react-oidc-context"

const config = {
    authority: process.env.REACT_APP_KEYCLOAK_URL || '/auth/realms/aegis',
    client_id: "aegis-frontend",
    redirect_uri: '/'
}

function AuthContext(props) {

    return (
        <AuthProvider {...config}>
            {props.children}
        </AuthProvider>
    )
}

export default AuthContext