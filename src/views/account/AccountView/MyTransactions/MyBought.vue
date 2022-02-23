<template>
    <my-navbar title="我买到的"></my-navbar>

    <div v-for="o in orders" :key="o.id" class="card">
        <div class="seller-nick">{{ o.sellerNick }} 卖出</div>
        <div class="title">
            {{ o.itemTitle }}
        </div>
        <div class="price">
            创建时间: {{ o.created }} <br />
            价格: {{ o.itemPrice }} <br />
            数量:
            {{ o.itemNum }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getBought, Order } from "@/api/order"
import MyNavbar from "@/components/MyNavbar.vue"
import { onMounted, ref } from "vue"
const orders = ref<Order[]>()

onMounted(async () => {
    const request = await getBought()

    const response = request.data

    if (response.code === 200) {
        orders.value = response.data
    }
})
</script>

<style scoped>
.card {
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.seller-nick {
    background-color: #f3f3f3;
    font-size: 14px;
    padding: 5px;
    border-bottom: #ccc 1px solid;
}
.title {
    padding: 10px;
}
.price {
    font-size: 14px;
    padding: 5px;
}
</style>
