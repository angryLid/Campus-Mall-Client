<template>
    <my-navbar title="商品详情" route-name="homepage" />

    <div class="container" v-if="productDetail">
        <van-row class="panel">
            <van-col span="4">
                <van-image round :src="guestAvatar"> </van-image>
            </van-col>
            <van-col span="12" offset="1">
                <div class="username">
                    {{ productDetail.sellerName }}
                </div>
                <div class="datetime">
                    {{ formattedTime(productDetail.publishTime) }} 发布
                </div>
            </van-col>
        </van-row>

        <van-row class="price"> ￥{{ productDetail.price }} </van-row>

        <van-row class="title">
            {{ productDetail.title }}
        </van-row>
        <van-row class="desc">
            {{ productDetail.description }}
        </van-row>

        <image-set :product="productDetail"> </image-set>
    </div>

    <van-action-bar>
        <van-action-bar-button
            type="warning"
            text="加入购物车"
            @click="onAddCart"
        />
        <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
</template>

<script lang="ts" setup>
import { postOneRecord } from "@/api/cart"
import { getOneProduct, ProductDetail } from "@/api/product"
import type { Ref } from "vue"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import guestAvatar from "../../assets/avatar4guest.jpg"
import ImageSet from "../../components/ImageSet.vue"
import { Toast } from "vant"
import MyNavbar from "@/components/MyNavbar.vue"

const route = useRoute()

const id = computed(() => {
    if (typeof route.params.id === "string") {
        return route.params.id
    }
    return ""
})

const productDetail: Ref<ProductDetail | undefined> = ref()

onMounted(() => {
    getOneProduct(id.value).then((res) => {
        console.log(
            "%c [res]:",
            "color:white;background:blue;font-size:13px",
            res
        )
        productDetail.value = res.data.data
    })
})

function formattedTime(time: string) {
    const d = new Date(time)
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

async function onAddCart() {
    const req = await postOneRecord(id.value)
    const resp = req.data
    if (resp.code === 200) {
        Toast.success("加入购物车成功")
    } else {
        Toast.fail("加入购物车失败")
    }
}
</script>

<style scoped>
.container {
    width: 92vw;
    margin: 0 auto;
}
.panel {
    width: 100%;
    margin-top: 16px;
}
.username {
    font-size: 18px;
}
.datetime {
    margin-top: 4px;
    color: #666;
}
.price {
    margin-top: 18px;
    font-size: 24px;
    color: rgb(235, 50, 50);
}
.title {
    font-size: 20px;
    margin-top: 16px;
}
.desc {
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>
