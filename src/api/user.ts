import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/account"

// GET /client/account/myaccount
export function getMyAccount() {
    return useAxios().get(url + "/myaccount")
}
export function getStudentInfo() {
    return useAxios().get("/client/account/student_info/")
}

export function getNameByTel(telephone: string) {
    return useAxios().get(`${url}/username/${telephone}`)
}

export function getUserRole() {
    return useAxios().get(url + "/myaccount/roletype")
}

export function setName(name: string) {
    return useAxios().post(url + "/name", { name })
}
