<template>
    <my-navbar title="账户设置" route-name="account"></my-navbar>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="user.oldName"
                name="当前用户名"
                label="当前用户名"
                placeholder="用户名"
                disabled
            />
            <van-field
                v-model="user.newName"
                name="密码"
                label="新的用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
        </van-cell-group>
        <div style="margin: 16px">
            <van-button block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

    <van-form>
        <div style="margin: 16px">
            <van-button type="danger" block @click="onClick">
                退出账户
            </van-button>
        </div>
    </van-form>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { useRouter } from "vue-router"
import MyNavbar from "@/components/MyNavbar.vue"
import { reactive } from "vue"
const router = useRouter()
const store = useStore()

const user = reactive({
    oldName: "",
    newName: "",
})
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

function onSubmit() {
    return
}
</script>

<style scoped></style>
