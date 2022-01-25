import { useAxios } from "@/utils/ajax"

export function doLogin(telephone: string, password: string) {
    const axios = useAxios()
    return axios.post("/client/login/", {
        telephone,
        password,
    })
}
