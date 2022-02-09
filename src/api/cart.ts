import { useAxios } from "@/utils/ajax"

const url = "/client/cart"

export function postOneRecord(productId: string) {
    return useAxios().post(`${url}/${productId}`)
}
