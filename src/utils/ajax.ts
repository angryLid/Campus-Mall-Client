import axios from "axios"

const instance = axios.create({
    // baseURL: "http://192.168.138.225:8080/",
    baseURL: "http://localhost:8080/",
})

export default instance
