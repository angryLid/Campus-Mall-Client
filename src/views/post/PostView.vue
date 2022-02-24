<template>
    <van-nav-bar title="商品发布" />

    <van-form @submit="onSubmit" class="form">
        <van-cell-group>
            <van-field
                v-model="title"
                rows="1"
                autosize
                label="物品名称"
                type="textarea"
                maxlength="50"
                placeholder="包括品牌, 具体型号名等"
                show-word-limit
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="description"
                rows="3"
                autosize
                label="物品描述"
                type="textarea"
                maxlength="500"
                placeholder="请尽可能详细地描述新旧程度, 是否有功能受损等"
                show-word-limit
            />
        </van-cell-group>

        <van-cell-group>
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader v-model="images" :max-count="6" />
                </template>
            </van-field>
        </van-cell-group>

        <van-cell-group>
            <van-field
                v-model="price"
                name="价格"
                label="价格"
                placeholder="价格区间 0.00 - 9999.99"
                :rules="[{ required: true, message: '请填写价格' }]"
                @focusin="onPriceFocusIn"
                @click="onPriceFocusIn"
                readonly
            />
        </van-cell-group>

        <van-number-keyboard
            :show="show"
            theme="custom"
            extra-key="."
            close-button-text="完成"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
        />
        <van-field
            v-model="result"
            is-link
            readonly
            name="picker"
            label="发布到"
            placeholder="请选择"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
            <van-picker
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
            />
        </van-popup>
        <div style="margin: 16px">
            <van-button
                block
                type="primary"
                native-type="submit"
                :disabled="btnDisabled"
            >
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script lang="ts" setup>
import { postOneProduct } from "@/api/product"
import { getMerchantInfo } from "@/api/qualification"
import { getStudentInfo } from "@/api/user"
import { Toast, UploaderFileListItem } from "vant"
import { onMounted } from "vue"
import { ref } from "vue"

const title = ref("")
const description = ref("")
const images = ref<UploaderFileListItem[]>([])
const price = ref<string>("")
const show = ref(false)
const btnDisabled = ref(true)
const result = ref("")
const showPicker = ref(false)
const columns = ref<string[]>([])

const typeMapping = new Map()

onMounted(async () => {
    await initUserRole()
    if (columns.value.length === 0) {
        columns.value.push("请先进行认证")
        result.value = "请先进行认证"
    }
})

function onConfirm(value: string) {
    result.value = value
    showPicker.value = false
}

function onInput(inputStr: string | number) {
    const isDot = inputStr === "."
    if (price.value.length === 0 && isDot) {
        return
    }

    if (price.value === "0") {
        if (isDot) {
            price.value += inputStr
        } else {
            return
        }
    }

    if (price.value.includes(".")) {
        if (isDot) {
            return
        }

        const re = /\.[0-9]{2}$/gm
        if (re.test(price.value)) {
            return
        } else {
            price.value += inputStr
            return
        }
    }

    if (price.value.length >= 4 && !isDot) {
        return
    }

    price.value += inputStr
}

function onDelete() {
    if (price.value.length > 0) {
        price.value = price.value.substring(0, price.value.length - 1)
    }
}

function onPriceFocusIn() {
    show.value = true
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

    formData.append("title", title.value)
    formData.append("description", description.value)
    formData.append("price", price.value)
    formData.append("pType", typeMapping.get(result.value))
    const req = await postOneProduct(formData)
    const resp = req.data
    if (resp.code === 200) {
        Toast("发布成功")
    } else {
        Toast("发布失败")
    }
}

async function initUserRole() {
    const req = await getMerchantInfo()
    const resp = req.data

    if (resp.code === 200 && resp.data) {
        const enterpriseName = resp.data.enterpriseName
        const currentStatus = resp.data.currentStatus
        if (currentStatus === "approved") {
            result.value = enterpriseName
            columns.value.push(enterpriseName)
            typeMapping.set(enterpriseName, "enterprise")
            btnDisabled.value = false
        }
    }

    const req2 = await getStudentInfo()

    const resp2 = req2.data
    if (resp2.code === 200 && resp2.data != null) {
        const student = resp2.data.name
        result.value = `个人闲置(${student})`
        columns.value.push(`个人闲置(${student})`)
        typeMapping.set(`个人闲置(${student})`, "personal")
        btnDisabled.value = false
    }
}
</script>

<style scoped></style>
