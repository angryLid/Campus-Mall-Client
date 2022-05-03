<template>
    <my-navbar title="我的发布" route-name="account" />
    <van-cell-group v-for="i in data" :key="i.id">
        <van-cell
            :title="i.title"
            :value="'￥' + i.price.toFixed(2)"
            @click="() => onClick(i)"
        ></van-cell>
    </van-cell-group>

    <van-action-sheet v-model:show="show" title="操作">
        <div style="text-align: center; height: 40vh; line-height: 40vh">
            {{ current?.title }}
        </div>
        <van-button block type="danger" @click="onDelete">下架</van-button>
    </van-action-sheet>
</template>

<script lang="ts" setup>
import { cancel, getMyPublished, Product } from "@/api/product"
import MyNavbar from "@/components/MyNavbar.vue"
import { Toast } from "vant"
import { onMounted, Ref, ref } from "vue"

const data: Ref<Product[]> = ref([])
const show = ref(false)
const current = ref<Product>()
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

function onClick(item: Product) {
    show.value = !show.value
    current.value = item
}

async function onDelete() {
    if (!current.value) {
        return
    }
    const req = await cancel(current.value?.id)
    const resp = req.data
    if (resp.code === 200) {
        Toast.success("下架成功")
        show.value = false
        await init()
    }
}
</script>

<style scoped></style>
