<template>
    <van-tab title="登录">
        <van-cell-group inset>
            <van-field
                v-model="model.telephone"
                type="tel"
                label="手机号"
                required
            />
            <van-field
                v-model="model.password"
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
                @click="handleSubmit"
            >
                登录
            </van-button>
        </van-cell-group>
    </van-tab>
</template>

<script lang="ts" setup>
import { useStore } from "@/store"
import { useAxios } from "@/utils/ajax"
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()
const axios = useAxios()
const model = reactive({
    telephone: "",
    password: "",
})

async function handleSubmit() {
    const req = await axios.post("/user/signin/", {
        telephone: model.telephone,
        password: model.password,
    })

    const resp = req.data

    if (resp.code === 200) {
        store.$patch({ auth: resp.data })
        router.replace({ name: "homepage" })
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
