<template>
    <my-navbar title="账户设置" route-name="account"></my-navbar>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field
                v-model="store.user.name"
                name="当前用户名"
                label="当前用户名"
                placeholder="用户名"
                disabled
            />
            <van-field
                v-model="name"
                name="新的用户名"
                label="新的用户名"
                :placeholder="message"
                :rules="[
                    {
                        required: true,
                        pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,20}$/,
                        message,
                    },
                ]"
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
import { setName } from "@/api/user"
import MyNavbar from "@/components/MyNavbar.vue"
import { useStore } from "@/store"
import docCookies from "@/utils/cookies"
import { Toast } from "vant"
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const store = useStore()

const message = "长度2-20位,字母,数字,下划线和汉字"
const name = ref("")

function onClick() {
    store.$patch({ auth: "" })
    store.$patch({
        user: {
            name: undefined,
            telephone: undefined,
        },
    })
    docCookies.removeItem("auth", null, null)
    router.replace({ name: "account" })
}

async function onSubmit() {
    const request = await setName(name.value)
    const response = request.data
    if (response.code === 200) {
        store.user.name = name.value
        Toast("修改成功")
    } else {
        Toast("用户名已经被占用了\n请换一个吧")
    }
}
</script>

<style scoped></style>
