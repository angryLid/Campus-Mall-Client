import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import { BaseAccountInfo } from "./interface/data_transfer"

export interface State {
    count: number
    jwt: string
    user: BaseAccountInfo
    imageHostUrl: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            count: 0,
            jwt: "",
            user: {
                name: "游客, 您好",
                telephone: "点击此处注册或登录",
                followed: 0,
                following: 0,
            },
            imageHostUrl: "http://119.91.147.80:9000/mall/",
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
    },
})

export function useStore() {
    return baseUseStore(key)
}
