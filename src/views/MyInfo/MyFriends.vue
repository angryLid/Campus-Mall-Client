<template>
    <van-grid>
        <van-grid-item @click="() => navigate('favorite')">
            <span>{{ favorite }}</span>
            <span>收藏</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ history }}</span>
            <span>历史浏览</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ user.following }}</span>
            <span>关注</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ user.followed }}</span>
            <span>粉丝</span>
        </van-grid-item>
    </van-grid>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { useStore } from "@/store"
import docCookies from "@/utils/cookies"

const router = useRouter()
const store = useStore()

const user = store.user
const favorite = store.favorite

const history = getHistory()

function getHistory() {
    let history = docCookies.getItem("history")
    return history ? history : 0
}
function navigate(name: string) {
    router.push({
        name,
    })
}
</script>

<style scoped></style>
