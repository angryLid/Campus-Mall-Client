import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"
const url = apiVersion + "/order"

export interface UploadOrder {
    id: number
    quantity: number
}
export interface Order {
    id: number
    sellerNick: string
    buyerNick: string
    itemTitle: string
    itemPrice: number
    itemNum: number
    created: string
    status: string
}
export function pay(payload: UploadOrder[]) {
    return useAxios().post(url + "/payment/", payload)
}

export function getBought() {
    return useAxios().get(url + "/bought")
}

export function getSold() {
    return useAxios().get(url + "/sold")
}
