import { getMyAccount } from "@/api/user"
import { useStore } from "@/store"

function resetStore() {
    const store = useStore()
    store.$patch({
        user: {
            name: "游客, 您好",
            telephone: "请点击此处登录",
            followed: 0,
            following: 0,
        },
    })
}

export async function updateAccount() {
    const store = useStore()
    if (store.token !== "") {
        try {
            const { data } = await getMyAccount()
            if (data.code === 200) {
                store.$patch({
                    user: {
                        followed: data.data.followed,
                        telephone: data.data.telephone,
                        name: data.data.name,
                        following: data.data.following,
                    },
                })
            } else {
                resetStore()
            }
        } catch (e) {
            resetStore()
        }
    } else {
        resetStore()
    }
}
