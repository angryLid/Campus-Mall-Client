import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/qualification"

export interface Qualification {
    id: number
}

export function getMine() {
    const axios = useAxios()

    return axios.get(url + "/")
}

export function postOne(formData: FormData) {
    return useAxios().post(url + "/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export function getMerchantInfo() {
    return useAxios().get(url + "/info")
}
