import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

export interface State {
    count: number
    jwt: string
    user: Record<string, any>
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state() {
        return {
            count: 0,
            jwt: "",
            user: {},
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
