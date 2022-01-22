<template>
    <van-nav-bar
        title="认证您的身份"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-cell-group inset>
        <van-cell title="您的身份" :value="role" />
    </van-cell-group>
    <van-button @click="getRoleType">Debug</van-button>
</template>

<script lang="ts" setup>
import ajax from "@/utils/ajax"
import { onMounted } from "vue"
import { useRouter } from "vue-router"

onMounted(async () => {
    const req = await ajax.get("/user/myaccount/roletype/")
    const resp = await req.data

    role = getRole(resp.data)
})
const router = useRouter()

let role = "尚未认证"

function getRole(key: string) {
    const map = new Map()
    map.set("unknown", "尚未认证")

    return map.get(key)
}
function onClickLeft() {
    router.replace({ name: "account" })
}

async function getRoleType() {
    const req = await ajax.get("/user/myaccount/roletype/")
    const resp = await req.data
    return resp
}
</script>

<style scoped></style>
