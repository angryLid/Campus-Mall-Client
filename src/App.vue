<template>
    <!-- <van-tabbar v-model="active">
        <van-tabbar-item
            :icon="switchIcon('homepage', 'wap-home')"
            name="homepage"
        >
            首页
        </van-tabbar-item>
        <van-tabbar-item :icon="switchIcon('post', 'add')" name="post"
            >发布</van-tabbar-item
        >
        <van-tabbar-item :icon="switchIcon('message', 'comment')" name="message"
            >消息</van-tabbar-item
        >
        <van-tabbar-item :icon="switchIcon('account', 'manager')" name="account"
            >我的</van-tabbar-item
        >
    </van-tabbar> -->
    <router-view></router-view>
    <van-tabbar v-model="active" route :class="{ hidden: isHidden }">
        <van-tabbar-item
            v-for="t in tabbarLabels"
            :key="t.name"
            :icon="switchIcon(t.name, t.icon)"
            :name="t.name"
            replace
            :to="t.route"
        >
            {{ t.text }}
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const tabbarLabels = [
    {
        name: "homepage",
        icon: "wap-home",
        text: "首页",
        route: "/",
    },
    {
        name: "post",
        icon: "add",
        text: "发布",
        route: "/new",
    },
    {
        name: "message",
        icon: "comment",
        text: "消息",
        route: "/inbox",
    },
    {
        name: "account",
        icon: "manager",
        text: "我的",
        route: "/account",
    },
]
let active = ref("homepage")
const switchIcon = (name: string, iconName: string) =>
    active.value === name ? iconName : iconName + "-o"

type routeNameType = string | symbol | null | undefined

const isFirstLayer = (name: routeNameType) =>
    !(name === "tab0" || name === "tab1" || name === "tab2" || name === "tab3")

let isHidden = computed(() => isFirstLayer(route.name))
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
