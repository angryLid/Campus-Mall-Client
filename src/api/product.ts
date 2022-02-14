import { useAxios } from "@/utils/ajax"

const url = "/client/product/"

export interface Product {
    id: number
    title: string
    description: string
    price: number
    image0: string | null
    image1: string | null
    image2: string | null
    image3: string | null
    image4: string | null
    image5: string | null
    modifiedAt: string
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
    return useAxios().get(`${url}${id}`)
}