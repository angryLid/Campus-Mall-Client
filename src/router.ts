import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import PostView from './views/PostView.vue'
import InboxView from './views/InboxView.vue'
import AccountView from './views/AccountView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/new', component: PostView },
    { path: '/inbox', component: InboxView },
    { path: '/account', component: AccountView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
