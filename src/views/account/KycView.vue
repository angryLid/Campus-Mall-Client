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
import { useAxios } from "@/utils/ajax"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"

const axios = useAxios()
onMounted(async () => {
    const req = await axios.get("/user/myaccount/roletype/")
    const resp = await req.data

    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
    role.value = getRole(resp.data)
})
const router = useRouter()

const role = ref("未知")

function getRole(key: string) {
    const map = new Map()
    map.set("unknown", "尚未认证")
    map.set("student_verified", "已认证的学生")
    return map.get(key)
}
function onClickLeft() {
    router.replace({ name: "account" })
}

async function getRoleType() {
    const req = await axios.get("/user/myaccount/roletype/")
    const resp = await req.data
    return resp
}
</script>

<style scoped></style>
