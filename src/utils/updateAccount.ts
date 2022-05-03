import { getMyAccount } from "@/api/user"
import { useStore } from "@/store"

function resetStore() {
    const store = useStore()
    store.$patch({
        user: {
            name: undefined,
            telephone: undefined,
        },
    })
}

export async function updateAccount() {
    const store = useStore()
    const { data } = await getMyAccount()
    if (data.code === 200) {
        store.$patch({
            user: {
                telephone: data.data.telephone,
                name: data.data.name,
            },
            followed: data.data.followed,
            following: data.data.following,
        })
    } else {
        resetStore()
    }
}
