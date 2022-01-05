<template>
    <van-tab title="注册">
        <van-cell-group inset>
            <div class="hint">支持大陆地区+86电话号码</div>
            <van-field v-model="telephone" type="tel" label="手机号" required />
            <div class="hint">长度8-16位, 允许数字或大小写字母</div>
            <van-field
                v-model="password"
                type="password"
                label="密码"
                required
            />
            <van-field
                v-model="comfirm"
                type="password"
                label="确认密码"
                required
            />
        </van-cell-group>
        <van-cell-group inset class="block-btn-parent">
            <van-button
                plain
                type="success"
                class="block-btn"
                @click="handleSubmit"
                >注册</van-button
            >
        </van-cell-group>
    </van-tab>
</template>

<script lang="ts" setup>
import { Toast } from "vant"
import { ref } from "vue"
import ajax from "../utils/ajax"

const telephone = ref("")

const password = ref("")

const comfirm = ref("")

function handleSubmit() {
    const verified = verify(telephone.value, password.value, comfirm.value)
    if (!verified) {
        Toast.fail("您输入的信息可能有误, 请检查")
    } else {
        ajax.post("/user/signup/", {
            telephone: telephone.value,
            password: password.value,
        }).then((res) => console.log(res))
    }
}

function verify(telephone: string, password: string, comfirm: string): boolean {
    const telephonePattern =
        /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
    const passwordPattern = /^([a-z]|[A-Z]|\d){8,16}$/gm

    if (password !== comfirm) {
        return false
    } else if (!telephonePattern.test(telephone)) {
        return false
    } else if (!passwordPattern.test(password)) {
        return false
    }

    return true
}
</script>

<style scoped>
.hint {
    padding: 30px 16px 0 16px;
    color: #636363;
    font-size: 13px;
}
</style>
