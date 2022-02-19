import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/swipe"

export function getSwipes() {
    return useAxios().get(url)
}
