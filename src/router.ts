import ChatView from "@/views/cart/ChatView.vue"
import type { RouteRecordRaw } from "vue-router"
import { createRouter, createWebHashHistory } from "vue-router"
import { useStore } from "./store"
import AccountView from "./views/account/AccountView.vue"
import MyFavorite from "./views/account/AccountView/MyFriends/MyFavorite.vue"
import SignView from "./views/account/AccountView/MyInfo/SignView.vue"
import AccountSettings from "./views/account/AccountView/MySettings/AccountSettings.vue"
import KycView from "./views/account/AccountView/MySettings/KycView.vue"
import MessageList from "./views/account/AccountView/MyTransactions/MessageList.vue"
import MyPublish from "./views/account/AccountView/MyTransactions/MyPublish.vue"
import InboxView from "./views/cart/CartView.vue"
import HomeView from "./views/home/HomeView.vue"
import ProductDetail from "./views/home/ProductDetail.vue"
import PostView from "./views/post/PostView.vue"
import WithTabbar from "./views/withTabbar.vue"
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
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    if (to.name === "app") {
        return { name: "mall" }
    }

    const store = useStore()
    if (to.name?.toString().startsWith("tr")) {
        if (store.user.telephone.length < 1) {
            return false
        }
    }
})
export default router
