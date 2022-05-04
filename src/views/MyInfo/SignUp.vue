<template>
    <van-tab title="注册">
        <van-cell-group inset>
            <div class="hint">支持大陆地区+86电话号码</div>
            <van-field
                v-model="user.telephone"
                type="tel"
                label="手机号"
                required
            />
            <div class="hint">长度8-16位, 允许数字或大小写字母</div>
            <van-field
                v-model="user.password"
                type="password"
                label="密码"
                required
            />
            <van-field
                v-model="user.comfirm"
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
import { signUp } from "@/api/auth"
import { useStore } from "@/store"
import { Toast } from "vant"
import { reactive } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()

const user = reactive({
    telephone: "",
    password: "",
    comfirm: "",
})

async function handleSubmit() {
    const verified = verify(user.telephone, user.password, user.comfirm)
    if (!verified) {
        Toast.fail("您输入的信息可能有误, 请检查")
    } else {
        const req = await signUp(user.telephone, user.password)
        const resp = req.data
        if (resp.code === 200) {
            store.$patch({ auth: resp.data })
            router.replace({ name: "mall" })
        }
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
