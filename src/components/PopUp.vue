<template>
    <div class="content">
        <div class="content-price">
            {{ product.title }}
        </div>

        <slot></slot>
        <div class="content-btn">
            <van-button type="success" block @click="() => btnFn(product.id)">
                {{ btnText }}
            </van-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Product } from "@/api/product"

defineProps<{
    btnFn: (id: number) => void
    btnText: string
    product: Product
}>()
</script>

<style scoped>
.content {
    min-height: 42vh;
    text-align: center;
}
.content-price {
    margin-top: 40px;
    margin-bottom: 100px;
    /* font-size: 40px; */
    font-weight: bold;
}
.content-btn {
    width: 75vw;
    margin: 22px auto;
}
</style>
