import {
    ActionBar,
    ActionBarButton,
    ActionBarIcon,
    Button,
    Card,
    Cell,
    CellGroup,
    Col,
    Field,
    Form,
    Grid,
    GridItem,
    Icon,
    Image,
    NavBar,
    NumberKeyboard,
    Row,
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

const app = createApp(App)

app.use(router).use(store, key)

app.use(Button)
    .use(ActionBarButton)
    .use(ActionBar)
    .use(ActionBarIcon)
    .use(Row)
    .use(Col)
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

app.mount("#app")
