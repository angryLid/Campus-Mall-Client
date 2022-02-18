<template>
    <van-nav-bar :title="navBarTitle" />
    <div v-for="cartItem in cartItems" :key="cartItem.id">
        <van-card
            :num="cartItem.productSum"
            :price="(cartItem.price * cartItem.productSum).toFixed(2)"
            :title="cartItem.title"
            :thumb="store.imageHostURL + cartItem.image0"
        >
            <template #footer>
                <van-button
                    size="mini"
                    type="primary"
                    @click="() => onQuery(cartItem)"
                >
                    客服
                </van-button>
                <van-button
                    size="mini"
                    type="danger"
                    @click="() => removeCartItem(cartItem)"
                >
                    移除
                </van-button>
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
        <van-row class="bar-child" justify="space-around">
            <van-col span="10" class="price"> 总计: ￥{{ totalPrice }}</van-col>
            <van-col span="10">
                <van-action-bar-button
                    type="danger"
                    text="结算"
                    @click="onClickButton"
                />
            </van-col>
        </van-row>
    </van-action-bar>

    <van-action-sheet v-model:show="show" title="确认支付">
        <div class="content">
            <div class="content-price">
                {{ totalPrice }}
            </div>

            <div class="content-btn">
                <van-button type="success" block @click="onPay">
                    付款
                </van-button>
            </div>
        </div>
    </van-action-sheet>
</template>

<script lang="ts" setup>
import { computed, Ref } from "vue"
import {
    getAllRecords,
    CartItem,
    postOneRecord,
    putOneRecord,
    doPayment,
    removeRecord,
} from "@/api/cart"

import { onMounted, ref } from "vue"
import { useStore } from "@/store"
import { Toast } from "vant"
import { useRouter } from "vue-router"
import { getSeller } from "@/api/product"
import { getUserRole } from "@/api/user"

const store = useStore()
const router = useRouter()

const show = ref(false)
const cartItems: Ref<CartItem[]> = ref([])
const navBarTitle = computed(() => `购物车(${cartItems.value.length})`)
const totalPrice = computed(() => {
    const total = cartItems.value.reduce((acc, cur) => {
        if (cur.checked) {
            return acc + cur.price * cur.productSum
        }
        return acc
    }, 0)
    return total.toFixed(2)
})
onMounted(async () => {
    await getMyCart()
})

async function getMyCart() {
    const req = await getAllRecords()
    const resp = req.data
    if (resp.code === 200) {
        cartItems.value = resp.data
    }
}

async function onPay() {
    const preTrans: number[] = []
    cartItems.value.forEach((item) => {
        if (item.checked) {
            preTrans.push(item.cartId)
        }
    })

    const req = await doPayment(preTrans)
    const resp = req.data

    if (resp.code === 200) {
        Toast("支付成功")
        show.value = false
        await getMyCart()
    }
}
async function onClickButton() {
    show.value = true
}
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

async function removeCartItem(cartItem: CartItem) {
    const req = await removeRecord(cartItem.cartId)
    const resp = req.data
    if (resp.code === 200) {
        cartItems.value = cartItems.value.filter(
            (item) => item.cartId !== cartItem.cartId
        )
        Toast("移除成功")
    } else {
        Toast("移除失败")
    }
}

async function onQuery(cartItem: CartItem) {
    const req = await getSeller(cartItem.id)
    const resp = req.data
    if (resp.code === 200) {
        router.push({
            name: "chat",
            params: {
                id: resp.data,
            },
        })
    }
}
</script>

<style scoped>
.bar {
    position: fixed;
    bottom: 50px;
}
.bar-child {
    width: 100%;
    display: flex;
    align-items: center;
}
.content {
    min-height: 42vh;
    text-align: center;
}
.content-price {
    margin-top: 40px;
    margin-bottom: 100px;
    font-size: 40px;
    font-weight: bold;
}
.content-btn {
    width: 75vw;
    margin: 22px auto;
}
.price {
    text-align: center;

    font-size: 18px;
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
