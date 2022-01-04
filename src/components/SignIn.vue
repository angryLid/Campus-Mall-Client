<template>
    <van-tab title="登录">
        <van-cell-group inset>
            <van-field v-model="telephone" type="tel" label="手机号" />
            <van-field v-model="password" type="password" label="密码" />
        </van-cell-group>
        <van-cell-group inset class="block-btn-parent">
            <van-button
                plain
                type="success"
                class="block-btn"
                @click="handleSubmit"
                >登录</van-button
            >
        </van-cell-group>
    </van-tab>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import axios from "axios"
import cookies from "../utils/cookies"
import { useRouter } from "vue-router"

const router = useRouter()
const telephone = ref("")
const password = ref("")

function handleSubmit() {
    axios
        .post("http://localhost:8080/login/", {
            telephone: telephone.value,
            password: password.value,
        })
        .then((res) => {
            if (res.data.code === 200) {
                cookies.setItem("user", res.data.data)
                router.replace({ name: "homepage" })
            }
        })
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
