<template>
    <my-navbar title="身份认证"></my-navbar>

    <van-form>
        <van-cell-group inset v-if="role.notice">
            <van-cell title="学号" :value="role.studentId" />
            <van-cell title="姓名" :value="role.name" />
            <van-cell title="班级" :value="role.belongTo" />
        </van-cell-group>

        <van-cell-group inset v-if="hasRecord">
            <van-cell title="名称" :value="record.enterpriseName" />
            <van-cell title="类型" :value="record.enterpriseType" />
            <van-cell title="申请时间" :value="record.createdAt.toString()" />
            <van-cell title="审批进度" :value="record.currentStatus" />
            <van-cell
                title="备注"
                v-if="record.comentary"
                :value="record.comentary"
            />
        </van-cell-group>
    </van-form>

    <!-- 提交表单部分 -->
    <van-form @submit="onSubmit" class="submit" v-if="putRecord">
        <van-cell-group inset>
            <van-field v-model="name" label="店铺名" placeholder="请输入" />
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
            <van-field name="uploader" label="经营资质">
                <template #input>
                    <van-uploader v-model="images" :max-count="6" />
                </template>
            </van-field>
        </van-cell-group>

        <van-cell-group inset>
            <van-button block type="primary" native-type="submit">
                提交
            </van-button>
        </van-cell-group>
    </van-form>
</template>

<script lang="ts" setup>
import { getMerchantInfo, postOne } from "@/api/qualification"
import { getStudentInfo } from "@/api/user"
import { Toast, UploaderFileListItem } from "vant"
import type { Ref } from "vue"
import { onMounted, reactive, ref } from "vue"
import MyNavbar from "@/components/MyNavbar.vue"

const role = reactive({
    notice: false,
    name: "",
    belongTo: "",
    studentId: "",
})
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

const putRecord = ref(false)
const hasRecord = ref(false)
const record = reactive({
    enterpriseName: "",
    enterpriseType: "",
    createdAt: new Date(),
    currentStatus: "",
    comentary: null,
})

// enum Status {
//     waiting = "等待审核",
//     approved = "审核通过",
//     rejected = "审核驳回,请重新提交",
// }

const map = new Map()
map.set("waiting", "等待审核")
map.set("approved", "审核通过")
map.set("rejected", "审核驳回,请重新提交")

onMounted(async () => {
    await loadInfo()
    await loadIdentity()
})

async function loadIdentity() {
    const req = await getStudentInfo()
    const resp = req.data
    if (resp.code === 200 && resp.data !== null) {
        role.name = resp.data.name
        role.studentId = resp.data.studentId
        role.belongTo = resp.data.belongTo
        role.notice = true
    }
}
async function loadInfo() {
    const req = await getMerchantInfo()

    const resp = req.data

    if (resp.code === 200) {
        if (resp.data !== null) {
            record.createdAt = resp.data.createdAt
            record.currentStatus = map.get(resp.data.currentStatus)
            record.enterpriseName = resp.data.enterpriseName
            record.enterpriseType = resp.data.enterpriseType
            record.comentary = resp.data.comentary

            hasRecord.value = true
            if (resp.data.currentStatus === "rejected") {
                putRecord.value = true
            }
        } else {
            putRecord.value = true
        }
    }
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

    if (resp.code === 200) {
        Toast.success("提交成功")
        loadInfo().then(() => (putRecord.value = false))
    } else {
        Toast.fail("提交失败")
    }
}
</script>

<style scoped></style>
