import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/swipe"
export interface SwipeModel {
    id: number
    title: string
    image: string
    status: number
    detail: string
    createdAt: string
}
export function getSwipes() {
    return useAxios().get(url)
}
