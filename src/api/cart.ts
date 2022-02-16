import { useAxios } from "@/utils/ajax"

const url = "/client/cart"

export interface CartItem {
    cartId: number
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

// 获得购物车列表
export function getAllRecords() {
    return useAxios().get(url + "/")
}

// 清空购物车
export function doPayment(items: number[]) {
    return useAxios().post(url + "/pay/", {
        items,
    })
}

// 移除商品
export function removeRecord(productId: string | number) {
    return useAxios().delete(`${url}/${productId}`)
}

export function getChatHistory() {
    return useAxios().get("/app/history/")
}
