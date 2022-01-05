<template>
    <div class="avatar-group" @click="handleSign">
        <div class="avatar-group-image">
            <van-image
                :src="src"
                height="60"
                width="60"
                round
                fit="cover"
                class="image"
            >
            </van-image>
        </div>

        <div class="avatar-group-info">
            <div class="avatar-group-info-username">{{ user.name }}</div>
            <div class="avatar-group-info-userid">{{ user.id }}</div>
        </div>
    </div>

    <van-grid>
        <van-grid-item
            ><span>{{ favorite < 0 ? "-" : favorite }}</span> <span>收藏</span>
        </van-grid-item>
        <van-grid-item
            ><span>{{ history < 0 ? "-" : history }}</span>
            <span>历史浏览</span>
        </van-grid-item>
        <van-grid-item
            ><span>{{ following < 0 ? "-" : following }}</span>
            <span>关注</span>
        </van-grid-item>
        <van-grid-item
            ><span>{{ followed < 0 ? "-" : followed }}</span
            ><span>粉丝</span>
        </van-grid-item>
    </van-grid>
    <div class="grid-title">我的交易</div>
    <van-grid>
        <!-- <van-grid-item icon="bag" text="我发布的" />
        <van-grid-item icon="gold-coin" text="我卖出的" />
        <van-grid-item icon="column" text="我买到的" />
        <van-grid-item icon="send-gift" text="我可转卖的" /> -->
        <van-grid-item>
            <van-icon name="bag" color="#ba391a" size="32"></van-icon>
            <span class="grid-item-text">我发布的</span>
        </van-grid-item>
        <van-grid-item>
            <van-icon name="gold-coin" color="#197dbb" size="32"></van-icon>
            <span class="grid-item-text">我卖出的</span>
        </van-grid-item>
        <van-grid-item>
            <van-icon name="column" color="#ba830c" size="32"></van-icon>
            <span class="grid-item-text">我买到的</span>
        </van-grid-item>
        <van-grid-item>
            <van-icon name="send-gift" color="#08946e" size="32"></van-icon>
            <span class="grid-item-text">我可转卖的</span>
        </van-grid-item>
    </van-grid>
    <van-cell-group class="cell-group">
        <van-cell title="身份认证" icon="gem" />
        <van-cell title="收货地址" icon="location" />
        <van-cell title="客服中心" icon="service" />
        <van-cell title="账户设置" icon="setting" />
    </van-cell-group>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue"
import { useRouter } from "vue-router"
import guestAvatar from "../assets/avatar4guest.jpg"
import ajax from "../utils/ajax"
import { useStore } from "../store"

const src = guestAvatar
const router = useRouter()
const store = useStore()

const favorite = ref(-1)
const history = ref(-1)
const following = computed(() => {
    if (store.state.user.following >= 0) return store.state.user.following
    else return -1
})
const followed = computed(() => {
    if (store.state.user.followed >= 0) return store.state.user.followed
    else return -1
})

let user = computed(() => {
    return {
        name: store.state.user.name,
        id: store.state.user.telephone,
        // name: "游客, 您好",
        // id: "点击此处注册或登录",
    }
})
// let user = computed(() => {
//     if (
//         store.state.user.name.length > 0 &&
//         store.state.user.telephone.length > 0
//     )
//         return {
//             name: store.state.user.name,
//             id: store.state.user.telephone,
//         }
//     else
//         return {
//             name: "游客, 您好",
//             id: "点击此处注册或登录",
//         }
// })

onMounted(() => {
    ajax.get("/user/myaccount/", {
        headers: { Authorization: store.state.jwt },
    }).then((res) => (store.state.user = res.data.data))
})

function handleSign() {
    router.replace({ name: "sign" })
}
</script>
<style scoped>
.grid-item-text {
    font-size: 14px;
}
.grid-title {
    color: #525252;
    padding-left: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
}
.cell-group {
    margin-top: 30px;
}

.avatar-group {
    display: flex;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 10px;
}
.avatar-group-info {
    margin-left: 16px;
}
.image {
    border: 1px solid #9c9c9c;
}
.avatar-group-info-username {
    font-size: 20px;
    font-weight: 700;
}
.avatar-group-info-userid {
    color: #525252;
    font-size: 14px;
}
</style>
