import { useAxios } from "@/utils/ajax"

export function getStudentInfo() {
    return useAxios().get("/client/account/student_info/")
}

export function getMerchantInfo() {
    return useAxios().get("/client/account/merchant_info/")
}
