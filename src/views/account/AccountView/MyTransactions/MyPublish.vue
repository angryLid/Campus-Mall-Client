<template>
    {{ data }}
</template>

<script lang="ts" setup>
import { getMessageList } from "@/api/message"
import { onMounted, ref } from "vue"

const data = ref()

onMounted(() => {
    getMessageList().then((res) => console.log(res))
})
</script>

<style scoped></style>
