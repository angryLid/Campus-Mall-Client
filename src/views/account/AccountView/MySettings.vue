<template>
    <van-cell-group class="cell-group">
        <van-cell title="身份认证" icon="gem" @click="() => toSubView('kyc')" />
        <van-cell title="收货地址" icon="location" />
        <van-cell title="客服中心" icon="service" />
        <van-cell
            title="账户设置"
            icon="setting"
            @click="() => toSubView('settings')"
        />
    </van-cell-group>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()

const toSubView = (name: string) => router.push({ name: name })
</script>

<style scoped>
.cell-group {
    margin-top: 30px;
}
</style>
