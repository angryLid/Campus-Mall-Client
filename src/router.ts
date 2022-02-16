import ChatView from "@/views/cart/ChatView.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import { useStore } from "./store"
import AccountView from "./views/account/AccountView.vue"
import SignView from "./views/account/AccountView/MyInfo/SignView.vue"
import AccountSettings from "./views/account/AccountView/MySettings/AccountSettings.vue"
import KycView from "./views/account/AccountView/MySettings/KycView.vue"
import InboxView from "./views/cart/CartView.vue"
import HomeView from "./views/home/HomeView.vue"
import ProductDetail from "./views/home/ProductDetail.vue"
import PostView from "./views/post/PostView.vue"
const routes = [
    { path: "/", component: HomeView, name: "homepage" },
    { path: "/new", component: PostView, name: "post" },
    { path: "/inbox", component: InboxView, name: "cart" },
    { path: "/account", component: AccountView, name: "account" },
    { path: "/sign", component: SignView, name: "sign" },
    { path: "/detail/:id", component: ProductDetail, name: "detail" },
    { path: "/kyc", component: KycView, name: "tr_kyc" },
    { path: "/settings", component: AccountSettings, name: "settings" },
    { path: "/chat/:id", component: ChatView, name: "chat" },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const store = useStore()
    if (to.name?.toString().startsWith("tr")) {
        if (store.user.telephone.length < 1) {
            return false
        }
    }
})
export default router
