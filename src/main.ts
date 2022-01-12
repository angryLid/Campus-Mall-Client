import {
    Button,
    Card,
    Cell,
    CellGroup,
    Field,
    Form,
    Grid,
    GridItem,
    Icon,
    Image,
    NavBar,
    NumberKeyboard,
    Search,
    Tab,
    Tabbar,
    TabbarItem,
    Tabs,
    Toast,
    Uploader,
} from "vant"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { key, store } from "./store"

createApp(App)
    .use(router)
    .use(store, key)
    .use(Button)
    .use(Card)
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
    .use(NumberKeyboard)
    .mount("#app")
