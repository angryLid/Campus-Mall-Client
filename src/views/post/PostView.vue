<template>
    <van-form @submit="onSubmit" class="form">
        <van-cell-group>
            <van-field
                v-model="title"
                rows="1"
                autosize
                :label="fieldTitle.label"
                type="textarea"
                maxlength="50"
                :placeholder="fieldTitle.placeholder"
                show-word-limit
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                v-model="description"
                rows="3"
                autosize
                :label="fieldDesc.label"
                type="textarea"
                maxlength="500"
                :placeholder="fieldDesc.placeholder"
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
                :label="fieldPrice.label"
                :placeholder="fieldPrice.placeholder"
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
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script lang="ts" setup>
import { useAxios } from "@/utils/ajax"
import type { UploaderFileListItem } from "vant"
import type { Ref } from "vue"
import { ref, watchEffect } from "vue"

const axios = useAxios()
// TODO: 前端缩图
// Form model part.
const title = ref("红米K40 12+256")
const description = ref("9新箱说全,未拆修")
const images: Ref<UploaderFileListItem[]> = ref([])
const price: Ref<string> = ref("999.99")

const show = ref(false)

const fieldTitle = {
    label: "物品名称",
    placeholder: "包括品牌, 具体型号名等",
}

const fieldDesc = {
    label: "物品描述",
    placeholder: "请尽可能详细地描述新旧程度, 是否有功能受损等",
}

const fieldPrice = {
    label: "价格",
    placeholder: "价格区间 0.00 - 9999.99",
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
function onSubmit() {
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

    axios
        .post("/product/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            console.log(res)
        })
}

watchEffect(() => {
    console.log(images.value)
})
</script>

<style scoped>
.form {
    padding-top: 40px;
}
</style>
