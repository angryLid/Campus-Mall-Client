import axios from "axios"
import docCookies from "./cookies"

const auth = docCookies.getItem("auth")
const instance = axios.create({
    // baseURL: "http://192.168.56.225:8080/",
    baseURL: "http://localhost:8080/",
    headers: {
        auth: auth ? auth : "",
    },
})

export default instance
