<template>
    <van-nav-bar
        title="认证您的身份"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-cell title="您的身份" :value="role" />
        </van-cell-group>

        <van-cell-group inset>
            <van-field
                v-model="picker.chosen"
                is-link
                readonly
                label="认证类型"
                placeholder="请选择"
                @click="onTrigger"
            />
            <van-popup v-model:show="picker.show" round position="bottom">
                <van-picker
                    :columns="picker.alternatives"
                    @cancel="onTrigger"
                    @confirm="onConfirm"
                />
            </van-popup>
        </van-cell-group>
        <van-cell-group inset>
            <van-field v-model="name" label="店铺名" placeholder="请输入" />
        </van-cell-group>
        <van-cell-group inset>
            <van-field name="uploader" label="经营资质">
                <template #input>
                    <van-uploader v-model="images" :max-count="6" />
                </template>
            </van-field>
        </van-cell-group>

        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
    <van-button @click="getRoleType">Debug</van-button>
</template>

<script lang="ts" setup>
import { useAxios } from "@/utils/ajax"
import type { UploaderFileListItem } from "vant"
import type { Ref } from "vue"
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"

const axios = useAxios()
const router = useRouter()

const role = ref("_")
const images: Ref<UploaderFileListItem[]> = ref([])
const picker = reactive({
    chosen: "",
    show: false,
    alternatives: [
        "奶茶, 冷饮, 冰淇淋等",
        "餐饮, 小吃等",
        "超市, 百货商店等",
        "其他",
    ],
})
const name = ref("")

onMounted(async () => {
    const req = await axios.get("/user/myaccount/roletype/")

    const resp = await req.data

    if (resp.code !== 200) {
        return
    }
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
    role.value = getRole(resp.data)
})

function getRole(key: string) {
    const map = new Map()
    map.set("unknown", "尚未认证")
    map.set("student_verified", "已认证的学生")
    return map.get(key)
}
function onClickLeft() {
    router.replace({ name: "account" })
}

function onConfirm(e: string) {
    picker.chosen = e
    picker.show = false
}

function onTrigger() {
    picker.show = !picker.show
}
function onSubmit() {
    return null
}
async function getRoleType() {
    const req = await axios.get("/user/myaccount/roletype/")
    const resp = await req.data
    return resp
}
</script>

<style scoped></style>
