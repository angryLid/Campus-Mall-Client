<template>
    <div v-for="cartItem in cartItems" :key="cartItem.id">
        <van-card
            :num="cartItem.productSum"
            :price="(cartItem.price * cartItem.productSum).toFixed(2)"
            :title="cartItem.title"
            :thumb="store.imageHostURL + cartItem.image0"
        >
            <template #footer>
                <van-button size="mini">
                    <van-checkbox
                        v-model="cartItem.checked"
                        shape="square"
                        class="checkbox"
                    >
                    </van-checkbox>
                </van-button>

                <van-button
                    size="mini"
                    class="cart-item-btn"
                    @click="() => decreaseQuantity(cartItem)"
                >
                    -
                </van-button>
                <van-button size="mini" class="cart-item-btn" disabled>
                    {{ cartItem.productSum }}
                </van-button>
                <van-button
                    size="mini"
                    class="cart-item-btn"
                    @click="() => increaseQuantity(cartItem)"
                >
                    +
                </van-button>
            </template>
        </van-card>
    </div>
    <van-card
        price="hidden"
        desc="hidden"
        title="hidden"
        thumb="hidden"
        style="visibility: hidden"
    >
    </van-card>

    <van-action-bar class="bar">
        <van-checkbox v-model="checked" shape="square" class="checkbox">
            全选
        </van-checkbox>

        <van-action-bar-button
            type="danger"
            text="立即购买"
            @click="onClickButton"
        />
    </van-action-bar>
</template>

<script lang="ts" setup>
/**
 * 这个组件是购物车
 *
 */
// Java Spring Vert.x PHP Laravel
import type { Ref } from "vue"
import {
    getAllRecords,
    CartItem,
    postOneRecord,
    putOneRecord,
} from "@/api/cart"
import { Toast } from "vant"
import { onMounted, ref } from "vue"
import { useStore } from "@/store"

const store = useStore()
const cartItems: Ref<CartItem[]> = ref([])
const checked = ref(false)
const onClickButton = () => Toast("点击按钮")

onMounted(async () => {
    // 初始化
    const req = await getAllRecords()
    const resp = req.data

    if (resp.code === 200) {
        cartItems.value = resp.data
    }
    console.log(
        "%c [resp]:",
        "color:white;background:blue;font-size:13px",
        resp
    )
})

async function increaseQuantity(cartItem: CartItem) {
    const req = await postOneRecord(cartItem.id)
    const resp = req.data
    if (resp.code === 200) {
        cartItem.productSum += 1
    }
}

async function decreaseQuantity(cartItem: CartItem) {
    if (cartItem.productSum <= 1) {
        return
    }
    const req = await putOneRecord(cartItem.id)
    const resp = req.data
    if (resp.code === 200) {
        cartItem.productSum -= 1
    }
}
</script>

<style scoped>
.bar {
    position: fixed;
    bottom: 50px;
}
.checkbox {
    padding-left: 10px;
    padding-right: 10px;
}

.cart-item-btn {
    font-weight: 900;
    margin-left: 3px;
    margin-right: 3px;
    padding-left: 8px;
    padding-right: 8px;
}
</style>
