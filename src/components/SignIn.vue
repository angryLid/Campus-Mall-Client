<template>
    <van-tab title="登录">
        <van-cell-group inset>
            <van-field v-model="tel" type="tel" label="手机号" />
            <van-field v-model="password" type="password" label="密码" />
        </van-cell-group>
        <van-cell-group inset class="block-btn-parent">
            <van-button plain type="success" class="block-btn">登录</van-button>
        </van-cell-group>
    </van-tab>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const tel = ref("")
const password = ref("")
</script>

<style>
.block-btn-parent {
    text-align: center;
}
.block-btn {
    display: block;
    width: 50%;
    margin: 0 auto;
}
</style>
