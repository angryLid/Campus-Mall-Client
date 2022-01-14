<template>
    <van-card
        v-for="(p, i) in products"
        :key="i"
        :price="p.price"
        :desc="p.description"
        :title="p.title"
        :thumb="`http://119.91.147.80:9000/mall/${p.image0}`"
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
import ajax from "../../utils/ajax"

const router = useRouter()

interface Product {
    id: string
    title: string
    description: string
    price: string
    image0: string
}
const products: Ref<Product[]> = ref([])

onMounted(() => {
    ajax.get("/product/").then((res) => {
        console.log(
            "%c [res]:",
            "color:white;background:blue;font-size:13px",
            res.data.data
        )
        products.value = res.data.data
    })
})

function onClick(id: string) {
    console.log("%c [id]:", "color:white;background:blue;font-size:13px", id)
    router.push({
        name: "detail",
        params: {
            id,
        },
    })
}
</script>

<style scoped></style>
