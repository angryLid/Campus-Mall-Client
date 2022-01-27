import { useAxios } from "@/utils/ajax"

export function signIn(telephone: string, password: string) {
    const axios = useAxios()
    return axios.post("/client/sign/in/", {
        telephone,
        password,
    })
}

export function signUp(telephone: string, password: string) {
    return useAxios().post("/client/sign/up/", { telephone, password })
}
