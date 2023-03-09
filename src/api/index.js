import demo from "./demo"
import local from './local'

let api = demo
if (JSON.parse(window.localStorage.getItem("storageDriver")) === "local") {
    api = local
}

function getAPI() {
    if (JSON.parse(window.localStorage.getItem("storageDriver")) === "local") {
        return local
    }
    return demo
}

export default api
export {
    getAPI
}