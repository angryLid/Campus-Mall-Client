<template>
    <van-card
        v-for="(p, i) in products"
        :key="i"
        :price="p.price"
        :desc="`${p.desc} 发布`"
        :title="p.title"
        :thumb="p.thumb"
    >
    </van-card>
</template>

<script lang="ts" setup>
const products = [
    {
        price: "2.00",
        desc: "开发者",
        title: "八成新 红米K40 12+256",
        thumb: "https://img.yzcdn.cn/vant/ipad.jpeg",
    },
    {
        price: "2.00",
        desc: "描述信息",
        title: "商品标题",
        thumb: "https://img.yzcdn.cn/vant/ipad.jpeg",
    },
]
</script>

<style scoped></style>
