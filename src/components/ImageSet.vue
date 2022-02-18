<template>
    <van-row>
        <van-image
            v-if="product?.image0"
            :src="url + product?.image0"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
    <van-row>
        <van-image
            v-if="product?.image1"
            :src="url + product?.image1"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
    <van-row>
        <van-image
            v-if="product?.image2"
            :src="url + product?.image2"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
    <van-row>
        <van-image
            v-if="product?.image3"
            :src="url + product?.image3"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
    <van-row>
        <van-image
            v-if="product?.image4"
            :src="url + product?.image4"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
    <van-row class="mb-lg">
        <van-image
            v-if="product?.image5"
            :src="url + product?.image5"
            class="mb"
            alt="details"
        >
        </van-image>
    </van-row>
</template>

<script lang="ts" setup>
import { ProductDetail } from "@/api/product"
import { useStore } from "../store"

defineProps<{
    product: ProductDetail
}>()
const store = useStore()
const url = store.imageHostURL
</script>

<style scoped>
.mb {
    margin-bottom: 12px;
}
.mb-lg {
    margin-bottom: 50px;
}
</style>
