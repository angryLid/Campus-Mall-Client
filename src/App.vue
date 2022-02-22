<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { useStore } from "@/store"
import cookies from "@/utils/cookies"

import { getMyAccount } from "./api/user"

const store = useStore()

onMounted(async () => {
    const auth = cookies.getItem("auth")

    if (auth !== null && auth !== "" && auth.trim() !== "") {
        store.$patch({
            auth,
        })
        const req = await getMyAccount()
        const resp = req.data
        if (resp.code === 200) {
            store.$patch({
                user: resp.data,
            })
        }
    }
})
</script>

<style scoped></style>
