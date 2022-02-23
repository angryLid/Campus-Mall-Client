<template>
    <my-navbar title="我卖掉的"> </my-navbar>

    <div v-for="o in orders" :key="o.id" class="card">
        <div class="title">
            {{ o.itemTitle }}
        </div>
        <div class="price">
            创建时间: {{ o.created }} <br />
            价格: {{ o.itemPrice }} <br />
            数量:
            {{ o.itemNum }}
        </div>
        <div class="buyer-nick">{{ o.buyerNick }} 买下</div>
    </div>
</template>

<script lang="ts" setup>
import MyNavbar from "@/components/MyNavbar.vue"
import { getSold, Order } from "@/api/order"
import { onMounted, ref } from "vue"

const orders = ref<Order[]>()
onMounted(async () => {
    const request = await getSold()

    const response = request.data

    console.log(
        "%c [response]:",
        "color:white;background:blue;font-size:13px",
        response
    )
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
.buyer-nick {
    background-color: #f3f3f3;
    font-size: 14px;
    padding: 5px;
    border-top: #ccc 1px solid;
}
.title {
    padding: 10px;
}
.price {
    font-size: 14px;
    padding: 5px;
}
</style>
