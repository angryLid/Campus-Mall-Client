<template>
    <van-search v-model="toBeSearched" placeholder="请输入搜索关键词" />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="o in swipeList" :key="o.id">
            <van-image :src="imageTemplate(o.image)" />
        </van-swipe-item>
    </van-swipe>

    <van-tabs v-model:active="active">
        <van-tab title="个人闲置">
            <product-list :fn="getUserProducts" />
        </van-tab>
        <van-tab title="校园商家">
            <product-list :fn="getRtrProducts" />
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { getUserProducts, getRtrProducts } from "@/api/product"
import { getSwipes, SwipeModel } from "@/api/swipe"
import { computed, onMounted, ref } from "vue"
import ProductList from "./ProductList.vue"
import { imageTemplate } from "@/utils/image"
const active = ref(0)
const swipeList = ref<SwipeModel[]>([])
const toBeSearched = computed(() => "")

onMounted(async () => {
    const req = await getSwipes()
    const { data } = req
    if (data.code === 200) {
        swipeList.value = data.data
    }
})
</script>

<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;

    text-align: center;
}
</style>
