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

        <van-cell-group inset v-if="hasRecord">
            <van-cell title="名称" :value="record.enterpriseName" />
            <van-cell title="类型" :value="record.enterpriseType" />
            <van-cell title="申请时间" :value="record.createdAt.toString()" />
            <van-cell title="审批进度" :value="record.currentStatus" />
        </van-cell-group>

        <div class="submit" v-if="putRecord">
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
        </div>
    </van-form>
</template>

<script lang="ts" setup>
import { getMine, postOne } from "@/api/qualification"
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
const name = ref("开发测试有限责任公司")

const putRecord = ref(false)

const record = reactive({
    enterpriseName: "",
    enterpriseType: "",
    createdAt: new Date(),
    currentStatus: "",
})
const hasRecord = ref(false)
onMounted(async () => {
    const req = await getMine()
    const resp = req.data

    if (resp.code === 200 && resp.data) {
        const map = new Map()
        map.set("waiting", "等待审核")
        map.set("approved", "审核通过")
        map.set("rejected", "审核驳回")
        record.createdAt = resp.data.createdAt
        record.currentStatus = map.get(resp.data.currentStatus)
        record.enterpriseName = resp.data.enterpriseName
        record.enterpriseType = resp.data.enterpriseType
        hasRecord.value = true
    } else if (resp.code === 200 && resp.data === null) {
        putRecord.value = true
    }

    const iife = async () => {
        const req = await axios.get("/user/myaccount/roletype/")

        const resp = await req.data

        if (resp.code !== 200) {
            return
        }

        role.value = getRole(resp.data)
    }
    await iife()
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
async function onSubmit() {
    const formData = new FormData()

    images.value.forEach((image, index) => {
        if (index > 5) {
            return
        }
        formData.append(
            `image${index}`,
            image.file ? image.file : "Exception: Upload Failed."
        )
    })

    formData.append("enterpriseName", name.value)
    formData.append("enterpriseType", picker.chosen)

    const req = await postOne(formData)
    const resp = req.data
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
}
async function getRoleType() {
    const req = await axios.get("/user/myaccount/roletype/")
    const resp = await req.data
    return resp
}
</script>

<style scoped></style>
