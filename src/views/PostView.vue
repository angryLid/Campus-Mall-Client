<template>
    <van-form @submit="onSubmit" class="form">
        <van-cell-group>
            <van-field
                v-model="title"
                rows="1"
                autosize
                label="物品名称"
                type="textarea"
                maxlength="50"
                placeholder="品牌, 型号名等"
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
                placeholder="请描述新旧程度, 是否有功能受损等"
                show-word-limit
            />
        </van-cell-group>

        <van-cell-group>
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <van-uploader v-model="images" :after-read="afterRead" />
                </template>
            </van-field>
        </van-cell-group>

        <van-cell-group inset>
            <van-field
                v-model="price"
                name="价格"
                label="价格"
                placeholder="0.00"
                type="number"
                :rules="[{ required: true, message: '请填写价格' }]"
            />
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>

    <img :src="src" alt="Red dot" />
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue"
import type { Ref } from "vue"
import ajax from "../utils/ajax"

interface Image {
    content: string
}

// Form model part.
const title = ref("测试标题")
const description = ref("测试描述")
const images: Ref<Image[]> = ref([])
const price = ref("0")

const src = ref("")
function onSubmit() {
    const prePost: Array<string> = []
    images.value.forEach((image) => {
        prePost.push(image.content)
    })

    ajax.post("/upload/", {
        images: prePost,
        title: title.value,
        description: description.value,
        price: parseInt(price.value),
    }).then((res) => {
        console.log(res)
    })
}

const afterRead = (file: object) => {
    //
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
