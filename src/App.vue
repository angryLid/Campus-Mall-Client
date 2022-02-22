<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "@/store"
import cookies from "@/utils/cookies"

import { useAxios } from "@/utils/ajax"

const route = useRoute()
const store = useStore()

const active = ref("mall")

onMounted(async () => {
    const auth = cookies.getItem("auth")

    store.$patch({
        auth: auth ? auth : "",
    })

    store.$subscribe((mutation, state) => {
        if (mutation.storeId === "main") {
            cookies.setItem("auth", state.auth)
        }
    })
    const req = await useAxios().get("/client/account/myaccount/")
    const resp = req.data
    if (resp.code === 200) {
        store.$patch({
            user: resp.data,
        })
    }
})
</script>

<style scoped></style>
