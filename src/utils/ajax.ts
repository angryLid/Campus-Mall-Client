import { useStore } from "@/store"
import axios from "axios"
import docCookies from "./cookies"

export function useAxios() {
    const store = useStore()

    return axios.create({
        // baseURL: "http://192.168.56.225:8080/",
        baseURL: "http://localhost:8080/",
        headers: {
            auth: docCookies.getItem("auth") || "",
        },
    })
}
