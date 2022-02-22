<template>
    <router-view></router-view>
    <van-card
        v-for="(p, i) in products"
        :key="i"
        :price="p.price.toFixed(2)"
        :desc="p.description"
        :title="p.title"
        :thumb="url + p.image0"
        @click="onClick(p.id)"
    >
    </van-card>
    <van-button block @click="nextPage" v-if="existMore"> 加载更多 </van-button>
    <van-button block @click="nextPage" v-else disabled> 到底了 </van-button>
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
import type { Product } from "@/api/product"

import type { Ref } from "vue"
import { onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import { useStore } from "../../store"
import { AxiosResponse } from "axios"

const props = defineProps<{
    fn: () => Promise<AxiosResponse>
}>()

const router = useRouter()
const store = useStore()
const products: Ref<Product[]> = ref([])

const existMore = ref(false)
let productList: Product[]

const url = store.imageHostURL

onMounted(() => {
    props.fn().then((res) => {
        const { data } = res
        if (data.code === 200) {
            productList = data.data
            nextPage()
        }
    })
})

function nextPage() {
    existMore.value = true
    for (let i = 0; i < 10; i++) {
        const p = productList.shift()
        if (p) {
            products.value.push(p)
        } else {
            existMore.value = false
            return
        }
    }
}
function onClick(id: number) {
    router.push({
        name: "detail",
        params: { id },
    })
}
</script>

<style scoped></style>
