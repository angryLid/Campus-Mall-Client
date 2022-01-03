<template>
    <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        title="欢迎回来"
    />
    <van-tabs v-model:active="active" class="tabs">
        <sign-in></sign-in>
        <sign-up></sign-up>
    </van-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

import SignIn from "../../components/SignIn.vue"
import SignUp from "../../components/SignUp.vue"

const router = useRouter()
const active = ref("sign-in")

function onClickLeft() {
    return router.back()
}
</script>

<style scoped>
.tabs {
    margin: 0 auto;
    width: 90vw;
}
</style>
