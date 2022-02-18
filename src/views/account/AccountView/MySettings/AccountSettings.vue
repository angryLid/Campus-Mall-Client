<template>
    <my-navbar title="账户设置" route-name="account"></my-navbar>
    <van-button type="danger" block @click="onClick">退出账户</van-button>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import MyNavbar from "@/components/MyNavbar.vue"
const router = useRouter()
const store = useStore()

function onClick() {
    store.$patch({ auth: "" })
    store.$patch({
        user: {
            name: "游客, 您好",
            telephone: "点击此处登录",
            followed: 0,
            following: 0,
        },
    })
    router.replace({ name: "account" })
}
</script>

<style scoped></style>
