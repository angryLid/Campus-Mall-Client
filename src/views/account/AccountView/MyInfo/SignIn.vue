<template>
    <van-tab title="登录">
        <van-cell-group inset>
            <van-field
                v-model="user.telephone"
                type="tel"
                label="手机号"
                required
            />
            <van-field
                v-model="user.password"
                type="password"
                label="密码"
                required
            />
        </van-cell-group>
        <van-cell-group inset class="block-btn-parent">
            <van-button
                plain
                type="success"
                class="block-btn"
                @click="onSubmit"
            >
                登录
            </van-button>
        </van-cell-group>
    </van-tab>
</template>

<script lang="ts" setup>
import { signIn } from "@/api/auth"
import { getMyAccount } from "@/api/user"
import { useStore } from "@/store"
import docCookies from "@/utils/cookies"
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()
const user = reactive({
    telephone: "",
    password: "",
})

async function onSubmit() {
    const req = await signIn(user.telephone, user.password)

    const resp = req.data

    if (resp.code === 200) {
        const token = resp.data
        store.$patch({ auth: token })
        docCookies.setItem("auth", token)

        await getMyAccount().then((res) => {
            if (res.data.code === 200) {
                store.$patch({ user: res.data.data })
                router.replace({ name: "mall" })
            }
        })
    }
}
</script>

<style>
.block-btn-parent {
    text-align: center;
}
.block-btn {
    display: block;
    width: 50%;
    margin: 0 auto;
}
</style>
