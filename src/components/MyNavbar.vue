<template>
    <van-nav-bar
        :title="title"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"

const props = defineProps<{
    routeName?: string
    title: string
}>()

const router = useRouter()
function onClickLeft() {
    if (props.routeName) {
        router.replace({
            name: props.routeName,
        })
    } else {
        router.back()
    }
}
</script>

<style scoped></style>
