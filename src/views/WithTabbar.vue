<template>
    <router-view></router-view>

    <van-tabbar v-model="active" route>
        <van-tabbar-item name="mall" replace to="/mall">
            <span>首页</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="wap-home" />
                <van-icon v-else name="wap-home-o" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="post" replace to="/post">
            <span>发布</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="add" />
                <van-icon v-else name="add-o" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="cart" replace to="/cart">
            <span>购物车</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="shopping-cart" />
                <van-icon v-else name="shopping-cart-o" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="account" replace to="/account">
            <span>我的</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="manager" />
                <van-icon v-else name="manager-o" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const active = ref("mall")
</script>

<style scoped></style>
