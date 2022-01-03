import { createRouter, createWebHashHistory } from "vue-router"

import HomeView from "./views/HomeView.vue"
import PostView from "./views/PostView.vue"
import InboxView from "./views/InboxView.vue"
import AccountView from "./views/AccountView.vue"
import SignView from "./views/sub-view/SignView.vue"
const routes = [
    { path: "/", component: HomeView, name: "tab0" },
    { path: "/new", component: PostView, name: "tab1" },
    { path: "/inbox", component: InboxView, name: "tab2" },
    { path: "/account", component: AccountView, name: "tab3" },
    { path: "/sign", component: SignView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
