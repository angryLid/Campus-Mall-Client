<template>
    <van-cell-group class="cell-group">
        <van-cell title="身份认证" icon="gem" @click="toKyc" />
        <van-cell title="收货地址" icon="location" />
        <van-cell title="客服中心" icon="service" />
        <van-cell title="账户设置" icon="setting" />
    </van-cell-group>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()
function toKyc() {
    router.push({ name: "kyc" })
}
</script>

<style scoped>
.cell-group {
    margin-top: 30px;
}
</style>
