import { createRouter, createWebHashHistory } from 'vue-router'
const Home = { template: '<h1>Home</h1>' }
const About = { template: '<h1>About</h1>' }

const routes = [
    { path: '/', component: Home },
    { path: '/new', component: About },
    { path: '/inbox', component: About },
    { path: '/account', component: About },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
