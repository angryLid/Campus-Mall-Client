<template>
    <van-nav-bar
        title="认证您的身份"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const router = useRouter()
function onClickLeft() {
    router.replace({ name: "account" })
}
</script>

<style scoped></style>
