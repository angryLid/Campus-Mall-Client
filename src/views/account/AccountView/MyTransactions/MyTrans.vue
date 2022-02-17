<template>
    <div class="grid-title">我的交易</div>
    <van-grid>
        <van-grid-item @click="() => push('pub')">
            <van-icon name="bag" color="#ba391a" size="32"></van-icon>
            <span class="grid-item-text">我发布的</span>
        </van-grid-item>
        <van-grid-item>
            <van-icon name="gold-coin" color="#197dbb" size="32"></van-icon>
            <span class="grid-item-text">我卖出的</span>
        </van-grid-item>
        <van-grid-item>
            <van-icon name="column" color="#ba830c" size="32"></van-icon>
            <span class="grid-item-text">我买到的</span>
        </van-grid-item>
        <van-grid-item @click="onMessage">
            <van-icon name="send-gift" color="#08946e" size="32"></van-icon>
            <span class="grid-item-text">我的消息</span>
        </van-grid-item>
    </van-grid>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()

function push(name: string) {
    router.push({
        name,
    })
}
function onMessage() {
    router.push({
        name: "chat",
        params: {
            id: "163",
        },
    })
}
</script>

<style scoped>
.grid-item-text {
    font-size: 14px;
}
.grid-title {
    color: #525252;
    padding-left: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
}
</style>
