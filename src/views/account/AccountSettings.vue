<template>
    <van-button type="danger" block @click="onClick">退出账户</van-button>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()

function onClick() {
    store.auth = ""
    router.replace({ name: "account" })
}
</script>

<style scoped></style>
