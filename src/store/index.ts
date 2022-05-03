import docCookies from "@/utils/cookies"
import { defineStore } from "pinia"

export const useStore = defineStore("main", {
    state: () => ({
        auth: "",
        user: {
            name: "",
            telephone: "",
        },
        followed: 0,
        following: 0,
        imageHostURL: "http://119.91.147.80:9000/mall/",
        favorite: 0,
    }),
    getters: {
        token: () => docCookies.getItem("auth") || "",
    },
})
