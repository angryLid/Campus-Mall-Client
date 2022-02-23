import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/auth"

// POST /{apiVersion}/auth
export function signIn(telephone: string, password: string) {
    const axios = useAxios()
    return axios.post(url, {
        telephone,
        password,
    })
}

// POST /{apiVersion}/auth/register
export function signUp(telephone: string, password: string) {
    return useAxios().post(url + "/register", { telephone, password })
}
