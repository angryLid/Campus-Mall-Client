<template>
    <van-grid>
        <van-grid-item>
            <span>{{ helper(favorite) }}</span>
            <span>收藏</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ helper(history) }}</span>
            <span>历史浏览</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ helper(following) }}</span>
            <span>关注</span>
        </van-grid-item>
        <van-grid-item>
            <span>{{ helper(followed) }}</span>
            <span>粉丝</span>
        </van-grid-item>
    </van-grid>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue"
import { useStore } from "../../../store"

const store = useStore()
const favorite = ref(-1)
const history = ref(-1)
const following = computed(() => {
    if (store.user.following >= 0) {
        return store.user.following
    } else {
        return -1
    }
})
const followed = computed(() => {
    if (store.user.followed >= 0) {
        return store.user.followed
    } else {
        return -1
    }
})

function helper(val: number) {
    return val < 0 ? "-" : val
}
</script>

<style scoped></style>
