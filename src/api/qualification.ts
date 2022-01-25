import { useAxios } from "@/utils/ajax"

export function getMine() {
    const axios = useAxios()

    return axios.get("/client/qualification/")
}

export function postOne(formData: FormData) {
    return useAxios().post("/client/qualification/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}
