import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/account"
export function getStudentInfo() {
    return useAxios().get("/client/account/student_info/")
}

export function getMerchantInfo() {
    return useAxios().get("/client/account/merchant_info/")
}

export function getNameByTel(telephone: string) {
    return useAxios().get(`${url}/username/${telephone}`)
}

export function getUserRole() {
    return useAxios().get(url + "/myaccount/roletype")
}
