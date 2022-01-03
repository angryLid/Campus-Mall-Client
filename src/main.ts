import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

import {
    Button,
    Tabbar,
    TabbarItem,
    Grid,
    GridItem,
    Icon,
    Cell,
    CellGroup,
    Image,
    Search,
    NavBar,
    Tab,
    Tabs,
    Field,
} from "vant"

createApp(App)
    .use(router)
    .use(Button)
    .use(TabbarItem)
    .use(Tabbar)
    .use(Grid)
    .use(GridItem)
    .use(Icon)
    .use(Cell)
    .use(CellGroup)
    .use(Image)
    .use(Search)
    .use(NavBar)
    .use(Tab)
    .use(Tabs)
    .use(Field)
    .mount("#app")
// import Vue from 'vue'
// import App from './App.vue'
// import { store } from './store'
// import { router } from './router'

// import axios from 'axios'
// // import element-ui
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// axios.defaults.baseURL = 'http://localhost:8080'
// Vue.prototype.$ajax = axios
// Vue.use(ElementUI)

// new Vue({
//   router,
//   store,
//   render: (h) => h(App)
// }).$mount('#app')
