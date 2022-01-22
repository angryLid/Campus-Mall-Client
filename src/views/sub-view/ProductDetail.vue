<template>
    <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="container">
        <van-row class="panel">
            <van-col span="4">
                <van-image round :src="guestAvatar"> </van-image>
            </van-col>
            <van-col span="12" offset="1">
                <div class="username">{{ publisher?.nikename }}</div>
                <div class="datetime">{{ formattedTime }} 发布</div>
            </van-col>
        </van-row>

        <van-row class="price"> ￥{{ product?.price }} </van-row>

        <van-row class="title">
            {{ product?.title }}
        </van-row>
        <van-row class="desc">
            {{ product?.description }}
        </van-row>

        <image-set v-if="product" :product="product"> </image-set>
    </div>

    <van-action-bar>
        <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" />
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" />
        <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" />
        <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
    </van-action-bar>
</template>

<script lang="ts" setup>
import { useAxios } from "@/utils/ajax"
import type { Ref } from "vue"
import { computed, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import guestAvatar from "../../assets/avatar4guest.jpg"
import ImageSet from "../../components/ImageSet.vue"
import { Product, User as Publisher } from "../../interface/data_transfer"
const ajax = useAxios()
const route = useRoute()
const router = useRouter()
const id = computed(() => route.params.id)

const product: Ref<Product | undefined> = ref()
const publisher: Ref<Publisher | undefined> = ref()

const formattedTime = computed(() => {
    const helper = (d: Date) => {
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }

    if (product.value) {
        const d = new Date(product.value?.modifiedAt)
        return helper(d)
    }

    return helper(new Date("1970-01-01"))
})
onMounted(() => {
    ajax.get(`/product/${id.value}`).then((res) => {
        console.log(
            "%c [res]:",
            "color:white;background:blue;font-size:13px",
            res
        )
        product.value = res.data.data.product
        publisher.value = res.data.data.publisher
    })
})

function onClickLeft() {
    router.replace({
        name: "homepage",
    })
}

function onClickButton() {
    return null
}

function onClickIcon() {
    return null
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
