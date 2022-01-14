import { createRouter, createWebHashHistory } from "vue-router"
import AccountView from "./views/AccountView.vue"
import HomeView from "./views/HomeView.vue"
import InboxView from "./views/InboxView.vue"
import PostView from "./views/PostView.vue"
import ProductDetail from "./views/sub-view/ProductDetail.vue"
import SignView from "./views/sub-view/SignView.vue"

const routes = [
    { path: "/", component: HomeView, name: "homepage" },
    { path: "/new", component: PostView, name: "post" },
    { path: "/inbox", component: InboxView, name: "message" },
    { path: "/account", component: AccountView, name: "account" },
    { path: "/sign", component: SignView, name: "sign" },
    { path: "/detail/:id", component: ProductDetail, name: "detail" },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
