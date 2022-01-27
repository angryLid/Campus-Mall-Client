import docCookies from "@/utils/cookies"
import { defineStore } from "pinia"

const auth = docCookies.getItem("auth")

export const useStore = defineStore("main", {
    state: () => ({
        auth: auth ? auth : "",
        user: {
            name: "游客, 您好",
            telephone: "点击此处登录",
            followed: 0,
            following: 0,
        },
        imageHostURL: "http://119.91.147.80:9000/mall/",
    }),
    actions: {
        setAuth(val: string) {
            this.auth = val
        },
    },
})
