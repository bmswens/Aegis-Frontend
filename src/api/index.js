import demo from "./demo"
import local from './local'

let api = demo
if (JSON.parse(window.localStorage.getItem("storageDriver")) === "local") {
    api = local
}

export default api