<template>
    <van-card
        v-for="(p, i) in products"
        :key="i"
        :price="p.price"
        :desc="p.description"
        :title="p.title"
        :thumb="url + p.image0"
        @click="onClick(p.id)"
    >
    </van-card>
    <van-card
        price="hidden"
        desc="hidden"
        title="hidden"
        thumb="hidden"
        style="visibility: hidden"
    >
    </van-card>
</template>

<script lang="ts" setup>
import type { Ref } from "vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../../interface/data_transfer"
import { useStore } from "../../store"
import ajax from "../../utils/ajax"

const router = useRouter()
const store = useStore()

const products: Ref<Product[]> = ref([])

const url = store.state.imageHostUrl

onMounted(() => {
    ajax.get("/product/").then((res) => {
        products.value = res.data.data
    })
})

function onClick(id: number) {
    router.push({
        name: "detail",
        params: { id },
    })
}
</script>

<style scoped></style>
