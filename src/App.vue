<template>
    <router-view></router-view>

    <van-tabbar v-model="active" route :class="{ hidden: isHidden }">
        <van-tabbar-item name="homepage" replace to="/">
            <span>首页</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="wap-home" />
                <van-icon v-else name="wap-home-o" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="post" replace to="/new">
            <span>发布</span>
            <template #icon="props">
                <van-icon v-if="props.active" name="add" />
                <van-icon v-else name="add-o" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item name="message" replace to="/inbox">
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
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "./store"
import cookies from "./utils/cookies"

import { useAxios } from "@/utils/ajax"

const route = useRoute()
const store = useStore()

const active = ref("homepage")

const isHidden = computed(() => isNotFirstLayer(route.name))

onMounted(async () => {
    const auth = cookies.getItem("auth")

    store.$patch({
        auth: auth ? auth : "",
    })

    store.$subscribe((mutation, state) => {
        if (mutation.storeId === "main") {
            cookies.setItem("auth", state.auth)
        }
    })
    const req = await useAxios().get("/client/account/myaccount/")
    const resp = req.data
    if (resp.code === 200) {
        store.$patch({
            user: resp.data,
        })
    }
})

function isNotFirstLayer(name: string | symbol | null | undefined) {
    const routeNames = ["homepage", "post", "message", "account"]
    const matched = routeNames.filter((item) => item === name)
    return matched.length < 1
}
</script>

<style scoped>
body {
    background: #f9f9f9;
}

.title-light {
    color: #777;
    font-weight: 500;
}
.hidden {
    display: none;
}
</style>
