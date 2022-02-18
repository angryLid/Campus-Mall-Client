<template>
    <my-navbar title="我的发布" route-name="account" />
    <template v-for="i in data" :key="i.id">
        <van-cell-group>
            <van-cell :title="i.title" :value="'￥' + i.price.toFixed(2)" />
            <van-row>
                <van-col span="4" offset="16">
                    <van-button
                        type="primary"
                        size="mini"
                        @click="() => onEdit(i)"
                    >
                        修改
                    </van-button>
                </van-col>
                <van-col span="4">
                    <van-button
                        type="danger"
                        size="mini"
                        @click="() => onDelete(i)"
                    >
                        下架
                    </van-button>
                </van-col>
            </van-row>
        </van-cell-group>
    </template>

    <van-action-sheet v-model:show="show" title="即将下架">
        <pop-up
            v-if="target"
            :btn-fn="onDelete2"
            btn-text="确认"
            title="即将下架这个商品"
            :product="target"
        />
    </van-action-sheet>
    <van-action-sheet v-model:show="show2" title="修改">
        <pop-up
            v-if="target"
            :btn-fn="onEdit2"
            btn-text="确认"
            title="修改这个商品"
            :product="target"
        >
            <van-form>
                <van-field
                    v-model="target.price"
                    type="number"
                    label="价格"
                    disabled
                />

                <van-field
                    v-model="price"
                    type="number"
                    label="改为"
                    name="pattern"
                    placeholder="正则校验"
                    :rules="[{ pattern, message: '请输入正确内容' }]"
                />
            </van-form>
        </pop-up>
    </van-action-sheet>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from "vue"
import MyNavbar from "@/components/MyNavbar.vue"
import { cancel, getMyPublished, Product } from "@/api/product"
import PopUp from "@/components/PopUp.vue"
import { Toast } from "vant"

const data: Ref<Product[]> = ref([])
const show = ref(false)
const show2 = ref(false)
const target = ref<Product>()
const pattern = /^[0-9]+(.[0-9]{1,2})?$/
const price = ref(0)
async function init() {
    const req = await getMyPublished()
    const resp = req.data
    if (resp.code === 200) {
        data.value = resp.data
    }
}
onMounted(async () => {
    await init()
})

function onDelete(p: Product) {
    show.value = true
    target.value = p
}

function onEdit(p: Product) {
    show2.value = true
    target.value = p
}

async function onEdit2(id: number) {
    return
}
async function onDelete2(id: number) {
    const req = await cancel(id)
    const resp = req.data
    if (resp.code === 200) {
        Toast.success("下架成功")
        show.value = false
        await init()
    }
}
</script>

<style scoped></style>
