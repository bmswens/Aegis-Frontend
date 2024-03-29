// React
import React from 'react'
import useLocalStorage from 'use-local-storage'

// custom
import demo from '../api/demo'
import local from '../api/local'

const defaultContext = {
    api: demo,
    lastUpdate: new Date(),
    update: /* istanbul ignore next */ () => {},
    setStorageDriver: /* istanbul ignore next */ () => {},
    storageDriver: "demo"
}

const APIContext = React.createContext(defaultContext)

function APIContextProvider(props) {

    const [ storageDriver, setStorageDriver ] = useLocalStorage("storageDriver", "demo")
    const [ api, setApi ] = React.useState(defaultContext.api)
    const [ lastUpdate, setLastUpdate ] = React.useState(defaultContext.lastUpdate)

    React.useEffect(() => {
        if (storageDriver === "local") {
            setApi(local)
        }
        else {
            setApi(demo)
        }
        setLastUpdate(new Date())
    }, [storageDriver])

    function update() {
        setLastUpdate(new Date())
    }

    return (
        <APIContext.Provider
            value={{
                api,
                lastUpdate,
                update,
                setStorageDriver,
                storageDriver
            }}
        >
            {props.children}
        </APIContext.Provider>
    )

}

export default APIContext
export {
    APIContextProvider
}