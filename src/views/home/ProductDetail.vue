<template>
    <my-navbar title="商品详情" />

    <div class="container" v-if="productDetail">
        <van-row class="panel">
            <van-col span="4">
                <van-image
                    round
                    :src="avatarTemplate(productDetail.sellerName.slice(0, 1))"
                />
            </van-col>
            <van-col span="12" offset="1">
                <div class="username">
                    {{ productDetail.sellerName }}
                </div>
                <div class="datetime">
                    {{ formattedTime(productDetail.publishTime) }} 发布
                </div>
            </van-col>
            <van-col span="5">
                <van-button
                    type="danger"
                    size="mini"
                    @click="onUnfollow"
                    v-if="productDetail.followedSeller"
                >
                    取消关注
                </van-button>
                <van-button type="primary" size="mini" @click="onFollow" v-else>
                    关注
                </van-button>
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
        <van-action-bar-icon icon="chat-o" text="客服" @click="talk" />

        <van-action-bar-icon
            v-if="productDetail?.favorite"
            icon="star"
            text="已收藏"
            color="#ff5000"
            @click="removeFavorite"
        />
        <van-action-bar-icon
            v-else
            icon="star-o"
            text="收藏"
            @click="addFavorite"
        />
        <van-action-bar-button
            type="warning"
            text="加入购物车"
            @click="onAddCart"
        />
    </van-action-bar>
</template>

<script lang="ts" setup>
import { Toast } from "vant"
import { useRoute, useRouter } from "vue-router"
import { computed, onMounted, ref } from "vue"
import { postOneRecord } from "@/api/cart"
import { deleteFavorite, setFavorite } from "@/api/favorite"
import { getOneProduct, ProductDetail } from "@/api/product"
import { follow, unfollow } from "@/api/relation"
import ImageSet from "@/components/ImageSet.vue"
import MyNavbar from "@/components/MyNavbar.vue"
import { avatarTemplate } from "@/utils/image"

const route = useRoute()
const router = useRouter()

const id = computed(() => {
    if (typeof route.params.id === "string") {
        return route.params.id
    }
    return ""
})

const productDetail = ref<ProductDetail>({
    image0: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",

    id: -1,
    title: "",
    description: "",
    price: 0,
    modifiedAt: "",

    sellerId: -1,
    sellerName: "",
    sellerTel: "",
    publishTime: "",

    followedSeller: false,
    favorite: false,
})

onMounted(async () => {
    const { data } = await getOneProduct(id.value)
    console.log(
        "%c [data]:",
        "color:white;background:blue;font-size:13px",
        data
    )
    if (data.code === 200) {
        productDetail.value = data.data
    }
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

async function onFollow() {
    const { data } = await follow(productDetail.value.sellerId)

    if (data.code === 200) {
        Toast.success("关注成功")
        productDetail.value.followedSeller = true
    } else {
        Toast.fail("关注失败")
    }
}

async function onUnfollow() {
    const { data } = await unfollow(productDetail.value.sellerId)

    if (data.code === 200) {
        Toast.success("取消关注成功")
        productDetail.value.followedSeller = false
    } else {
        Toast.fail("取消关注失败")
    }
}

async function addFavorite() {
    const { data } = await setFavorite(productDetail.value.id)

    if (data.code === 200) {
        Toast.success("收藏成功")
        productDetail.value.favorite = true
    } else {
        Toast.fail("收藏失败")
    }
}

async function removeFavorite() {
    const { data } = await deleteFavorite(productDetail.value.id)

    if (data.code === 200) {
        Toast.success("取消收藏成功")
        productDetail.value.favorite = false
    } else {
        Toast.fail("取消收藏失败")
    }
}

function talk() {
    router.push({
        name: "chat",
        params: {
            id: productDetail.value?.sellerTel,
        },
    })
    return
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
