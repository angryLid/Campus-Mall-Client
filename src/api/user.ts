import { useAxios } from "@/utils/ajax"

const url = "/client/account"
export function getStudentInfo() {
    return useAxios().get("/client/account/student_info/")
}

export function getMerchantInfo() {
    return useAxios().get("/client/account/merchant_info/")
}

export function getNameByTel(telephone: string) {
    return useAxios().get(`${url}/username/${telephone}`)
}
