<template>
    <router-view></router-view>

    <van-tabbar v-model="active" route :class="{ hidden: isHidden }">
        <van-tabbar-item
            :icon="switchIcon('homepage', 'wap-home')"
            name="homepage"
            replace
            to="/"
        >
            首页
        </van-tabbar-item>
        <van-tabbar-item
            :icon="switchIcon('post', 'add')"
            name="post"
            replace
            to="/new"
            >发布</van-tabbar-item
        >
        <van-tabbar-item
            :icon="switchIcon('message', 'comment')"
            name="message"
            replace
            to="/inbox"
            >消息</van-tabbar-item
        >
        <van-tabbar-item
            :icon="switchIcon('account', 'manager')"
            name="account"
            replace
            to="/account"
            >我的</van-tabbar-item
        >
    </van-tabbar>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useStore } from "./store"
import cookies from "./utils/cookies"
type routeNameType = string | symbol | null | undefined

const route = useRoute()
const store = useStore()

let active = computed(() => {
    return route.name as string
})

let isHidden = computed(() => isNotFirstLayer(route.name))

onMounted(() => {
    const auth = cookies.getItem("user")

    store.$patch({
        auth: auth ? auth : "",
    })

    store.$subscribe((mutation, state) => {
        if (mutation.storeId === "main") {
            cookies.setItem("auth", state.auth)
        }
    })
})
function switchIcon(name: string, iconName: string) {
    return active.value === name ? iconName : iconName + "-o"
}

function isNotFirstLayer(name: routeNameType) {
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
