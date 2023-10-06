// React
import React from 'react'

// keycloak
import Keycloak from 'keycloak-js'

// react-keycloak
import { ReactKeycloakProvider } from '@react-keycloak/web'

const keycloak = new Keycloak({
    url: process.env.REACT_APP_KEYCLOAK_URL || '/auth',
    realm: "aegis",
    clientId: "aegis-frontend"
})

function KeyCloakContext(props) {

    return (
        <ReactKeycloakProvider authClient={keycloak}>
            {props.children}
        </ReactKeycloakProvider>
    )
}

export default KeyCloakContext