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

export interface User {
    id: string
    nikename: string
}
