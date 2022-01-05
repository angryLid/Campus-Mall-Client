<template>
    <div>
        <van-search v-model="value" placeholder="请输入搜索关键词" />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "../store"

const store = useStore()
const value = computed(() => store.state.jwt)
</script>

<style lang="scss" scoped></style>
