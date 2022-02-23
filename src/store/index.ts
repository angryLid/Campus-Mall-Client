import docCookies from "@/utils/cookies"
import { defineStore } from "pinia"

const auth = docCookies.getItem("auth")

export const useStore = defineStore("main", {
    state: () => ({
        auth: auth ? auth : "",
        user: {
            name: "",
            telephone: "",
            followed: 0,
            following: 0,
        },
        imageHostURL: "http://119.91.147.80:9000/mall/",
        favorite: 0,
    }),
    actions: {
        setAuth(val: string) {
            this.auth = val
        },
    },
})
