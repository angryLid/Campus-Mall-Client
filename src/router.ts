import { createRouter, createWebHashHistory } from "vue-router"
import AccountView from "./views/account/AccountView.vue"
import KycView from "./views/account/KycView.vue"
import SignView from "./views/account/SignView.vue"
import HomeView from "./views/home/HomeView.vue"
import InboxView from "./views/inbox/InboxView.vue"
import PostView from "./views/post/PostView.vue"
import ProductDetail from "./views/sub-view/ProductDetail.vue"
const routes = [
    { path: "/", component: HomeView, name: "homepage" },
    { path: "/new", component: PostView, name: "post" },
    { path: "/inbox", component: InboxView, name: "message" },
    { path: "/account", component: AccountView, name: "account" },
    { path: "/sign", component: SignView, name: "sign" },
    { path: "/detail/:id", component: ProductDetail, name: "detail" },
    { path: "/kyc", component: KycView, name: "kyc" },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
