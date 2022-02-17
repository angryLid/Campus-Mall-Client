import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

export interface ChatNotification {
    telephone: string
    name: string
    createdAt: string
    content: string
}
const url = apiVersion + "/notification"
export function getMessageList() {
    return useAxios().get(url + "/")
}
