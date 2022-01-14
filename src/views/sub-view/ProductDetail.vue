<template>This is {{ id }}</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import ajax from "../../utils/ajax"

const route = useRoute()

const id = computed(() => route.params.id)

onMounted(() => {
    ajax.get(`/product/${id.value}`).then((res) =>
        console.log(
            "%c [res]:",
            "color:white;background:blue;font-size:13px",
            res
        )
    )
})
</script>

<style scoped></style>
