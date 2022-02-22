import { useAxios } from "@/utils/ajax"

const url = "/client/product/"

interface Images {
    image0: string | null
    image1: string | null
    image2: string | null
    image3: string | null
    image4: string | null
    image5: string | null
}

export interface Product extends Images {
    id: number
    title: string
    description: string
    price: number
    modifiedAt: string
}
export interface ProductDetail extends Product {
    sellerId: number
    sellerName: string
    sellerTel: string
    publishTime: string
    favorite: boolean
}
export function postOneProduct(formData: FormData) {
    return useAxios().post(url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export function getRtrProducts() {
    return useAxios().get(`${url}retailer/`)
}

export function getUserProducts() {
    return useAxios().get(url)
}

export function getOneProduct(id: string) {
    return useAxios().get(url + id)
}

export function getSeller(id: string | number) {
    return useAxios().get(`${url}seller/${id}`)
}

export function getMyPublished() {
    return useAxios().get(url + "published/")
}

export function cancel(id: number) {
    return useAxios().delete(url + id + "/")
}
