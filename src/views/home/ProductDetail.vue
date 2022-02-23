<template>
    <my-navbar title="商品详情" />

    <div class="container" v-if="productDetail">
        <van-row class="panel">
            <van-col span="4">
                <van-image
                    round
                    :src="avatarTemplate(productDetail.sellerName.slice(0, 1))"
                >
                </van-image>
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
                    type="primary"
                    size="mini"
                    @click="() => onFollow(productDetail!.sellerId)"
                    v-if="!isFollowingRef"
                >
                    关注
                </van-button>
                <van-button
                    type="danger"
                    size="mini"
                    @click="() => onUnfollow(productDetail!.sellerId)"
                    v-if="isFollowingRef"
                >
                    取消关注
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
        <van-action-bar-icon icon="chat-o" text="客服" @click="onFollow" />
        <van-action-bar-icon icon="cart-o" text="购物车" @click="onFollow" />

        <van-action-bar-icon
            v-if="!isFavoriteRef"
            icon="star-o"
            text="收藏"
            @click="()=>addFavorite(productDetail!.id)"
        />
        <van-action-bar-icon
            v-else
            icon="star"
            text="已收藏"
            color="#ff5000"
            @click="()=>removeFavorite(productDetail!.id)"
        />
        <van-action-bar-button
            type="warning"
            text="加入购物车"
            @click="onAddCart"
        />
    </van-action-bar>
</template>

<script lang="ts" setup>
import { postOneRecord } from "@/api/cart"
import { getOneProduct, ProductDetail } from "@/api/product"
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import ImageSet from "../../components/ImageSet.vue"
import { Toast } from "vant"
import MyNavbar from "@/components/MyNavbar.vue"
import { avatarTemplate } from "@/utils/image"
import { follow, isfollowing, unfollow } from "@/api/relation"
import { setFavorite } from "@/api/favorite"
const route = useRoute()

const id = computed(() => {
    if (typeof route.params.id === "string") {
        return route.params.id
    }
    return ""
})

const productDetail = ref<ProductDetail>()
const isFollowingRef = ref(false)
const isFavoriteRef = ref(false)
onMounted(async () => {
    let request = await getOneProduct(id.value)

    let { data } = request
    if (data.code === 200) {
        productDetail.value = data.data
        if (productDetail.value) {
            let sellerId = productDetail.value.sellerId
            let request = await isfollowing(sellerId)
            let { data } = request
            if (data.code === 200) {
                isFollowingRef.value = data.data
            }
        }
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

async function onFollow(id: number) {
    let request = await follow(id)
    let { data } = request
    if (data.code === 200) {
        Toast.success("关注成功")
        isFollowingRef.value = true
    } else {
        Toast.fail("关注失败")
    }
}

async function onUnfollow(id: number) {
    let request = await unfollow(id)
    let { data } = request
    if (data.code === 200) {
        Toast.success("取消关注成功")
        isFollowingRef.value = false
    } else {
        Toast.fail("取消关注失败")
    }
}

async function addFavorite(id: number) {
    console.log("%c [id]:", "color:white;background:blue;font-size:13px", id)
    let request = await setFavorite(id)
    let { data } = request
    if (data.code === 200) {
        Toast.success("收藏成功")
        isFavoriteRef.value = true
    } else {
        Toast.fail("收藏失败")
    }
}

async function removeFavorite(id: number) {
    let request = await setFavorite(id)
    let { data } = request
    if (data.code === 200) {
        Toast.success("取消收藏成功")
        isFavoriteRef.value = false
    } else {
        Toast.fail("取消收藏失败")
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
