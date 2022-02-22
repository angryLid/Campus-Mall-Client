import { useAxios } from "@/utils/ajax"
import { apiVersion } from "./version"

const url = `${apiVersion}/favorite`

export function isFavorite(productId: number) {
    return useAxios().get(url + "/" + productId)
}

export function setFavorite(productId: number) {
    return useAxios().post(url + "/" + productId)
}

export function deleteFavorite(productId: number) {
    return useAxios().delete(url + "/" + productId)
}
