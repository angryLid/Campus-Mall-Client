// 账户详情页
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import AccountView from "~/account/AccountView.vue"
// 购物车
import InboxView from "~/cart/CartView.vue"
import ChatView from "~/cart/ChatView.vue"
// 首页
import HomeView from "~/home/HomeView.vue"
import ProductDetail from "~/home/ProductDetail.vue"
import MyFavorite from "~/MyInfo/MyFavorite.vue"
import SignView from "~/MyInfo/SignView.vue"
import AccountSettings from "~/MySettings/AccountSettings.vue"
import KycView from "~/MySettings/KycView.vue"
import MessageList from "~/MyTransactions/MessageList.vue"
import MyBought from "~/MyTransactions/MyBought.vue"
import MyPublish from "~/MyTransactions/MyPublish.vue"
import MySold from "~/MyTransactions/MySold.vue"
import PostView from "~/post/PostView.vue"
import WithTabbar from "~/withTabbar.vue"
import { useStore } from "./store"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: WithTabbar,
        name: "app",
        children: [
            {
                path: "mall",
                component: HomeView,
                name: "mall",
                meta: {
                    keepAlive: true,
                },
            },
            { path: "post", component: PostView, name: "post" },
            { path: "cart", component: InboxView, name: "cart" },
            { path: "account", component: AccountView, name: "account" },
        ],
        meta: {
            keepAlive: true,
        },
    },

    { path: "/sign", component: SignView, name: "sign" },
    { path: "/detail/:id", component: ProductDetail, name: "detail" },
    { path: "/kyc", component: KycView, name: "tr_kyc" },
    { path: "/settings", component: AccountSettings, name: "settings" },
    { path: "/chat/:id", component: ChatView, name: "chat" },
    { path: "/chat", component: MessageList, name: "msgbox" },
    { path: "/publish", component: MyPublish, name: "pub" },
    { path: "/favorite", component: MyFavorite, name: "favorite" },
    { path: "/sold", component: MySold, name: "sold" },
    { path: "/bought", component: MyBought, name: "bought" },
]

const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.name === "app") {
        return { name: "mall" }
    }

    const store = useStore()
    const toName = to.name?.toString()

    if (toName === "sign" && store.user.telephone) {
        return false
    }
    if (toName === "tr_kyc" && !store.user.telephone) {
        return false
    }
})
export default router
