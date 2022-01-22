<template>
    <van-button type="danger" block @click="onClick">退出账户</van-button>
</template>

<script lang="ts" setup>
import docCookies from "@/utils/cookies"

function onClick() {
    docCookies.removeItem("auth", null, null)
}
</script>

<style scoped></style>
