import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = apiVersion + "/notification"
export function getMessageList() {
    return useAxios().get(url + "/")
}
