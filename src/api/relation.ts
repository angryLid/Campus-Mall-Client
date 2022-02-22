import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/relation"

export function follow(followerId: number) {
    return useAxios().post(`${url}/${followerId}`)
}

export function unfollow(followerId: number) {
    return useAxios().delete(`${url}/${followerId}`)
}

export function isfollowing(followerId: number) {
    return useAxios().get(`${url}/${followerId}`)
}
