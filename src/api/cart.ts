import { useAxios } from "@/utils/ajax"

const url = "/client/cart"

export interface CartItem {
    id: number
    title: string
    price: number
    productSum: number
    image0: string
    checked?: boolean
}

// 商品 + 1
export function postOneRecord(productId: string | number) {
    return useAxios().post(`${url}/${productId}`)
}
// 商品 - 1
export function putOneRecord(productId: string | number) {
    return useAxios().put(`${url}/${productId}`)
}
export function getAllRecords() {
    return useAxios().get(url + "/")
}
