<template>
    <div>
        <van-search v-model="toBeSearched" placeholder="请输入搜索关键词" />
    </div>
    <van-tabs v-model:active="active">
        <van-tab title="个人闲置"><person-trade></person-trade></van-tab>
        <van-tab title="校园商家">内容 2</van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
// import { useStore } from "../store"
import PersonTrade from "./sub-view/PersonTrade.vue"

const active = ref(0)
// const store = useStore()
const toBeSearched = computed(() => "")
</script>

<style lang="scss" scoped></style>
