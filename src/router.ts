import { createRouter, createWebHashHistory } from "vue-router"
import { useStore } from "./store"
import AccountSettings from "./views/account/AccountView/MySettings/AccountSettings.vue"
import AccountView from "./views/account/AccountView.vue"
import KycView from "./views/account/AccountView/MySettings/KycView.vue"
import SignView from "./views/account/AccountView/MyInfo/SignView.vue"
import HomeView from "./views/home/HomeView.vue"
import InboxView from "./views/inbox/InboxView.vue"
import PostView from "./views/post/PostView.vue"
import ProductDetail from "./views/home/ProductDetail.vue"
const routes = [
    { path: "/", component: HomeView, name: "homepage" },
    { path: "/new", component: PostView, name: "post" },
    { path: "/inbox", component: InboxView, name: "message" },
    { path: "/account", component: AccountView, name: "account" },
    { path: "/sign", component: SignView, name: "sign" },
    { path: "/detail/:id", component: ProductDetail, name: "detail" },
    { path: "/kyc", component: KycView, name: "tr_kyc" },
    { path: "/settings", component: AccountSettings, name: "settings" },
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
