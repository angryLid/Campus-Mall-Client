import docCookies from "@/utils/cookies"
import { defineStore } from "pinia"

const auth = docCookies.getItem("auth")

export const useStore = defineStore("main", {
    state: () => ({
        auth: auth ? auth : "",
        user: {
            followed: 0,
            following: 0,
        },
    }),
})
