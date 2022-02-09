<template>
    <div>
        <van-search v-model="toBeSearched" placeholder="请输入搜索关键词" />
    </div>
    <van-tabs v-model:active="active">
        <van-tab title="个人闲置">
            <person-trade />
        </van-tab>
        <van-tab title="校园商家">
            <retailer-trade />
        </van-tab>
    </van-tabs>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import PersonTrade from "./PersonTrade.vue"
import RetailerTrade from "./RetailerTrade.vue"

const active = ref(0)

const toBeSearched = computed(() => "")
</script>

<style lang="scss" scoped></style>
