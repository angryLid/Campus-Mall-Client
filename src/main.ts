import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { store, key } from "./store"
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
    Toast,
    Form,
    Uploader,
} from "vant"

createApp(App)
    .use(router)
    .use(store, key)
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
    .use(Toast)
    .use(Form)
    .use(Uploader)
    .mount("#app")
