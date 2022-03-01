<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"

import { updateAccount } from "./utils/updateAccount"

onMounted(async () => {
    await updateAccount()
})
</script>

<style scoped></style>
