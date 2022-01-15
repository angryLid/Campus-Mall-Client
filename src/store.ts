import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

export interface State {
    count: number
    jwt: string
    user: Record<string, object>
    imageHostUrl: string
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            count: 0,
            jwt: "",
            user: {},
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
