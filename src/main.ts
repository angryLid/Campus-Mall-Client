import { createPinia } from "pinia"
import {
    ActionBar,
    ActionBarButton,
    ActionBarIcon,
    ActionSheet,
    Button,
    Card,
    Cell,
    CellGroup,
    Checkbox,
    Col,
    DatetimePicker,
    Field,
    Form,
    Grid,
    GridItem,
    Icon,
    Image,
    List,
    NavBar,
    NumberKeyboard,
    Picker,
    Popup,
    Row,
    Search,
    Swipe,
    SwipeItem,
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

const app = createApp(App)

// 注册路由
app.use(router)

// 注册状态库
app.use(createPinia())
app.use(Swipe)
app.use(SwipeItem)
app.use(List)
app.use(ActionSheet)
app.use(Button)
app.use(ActionBarButton)
app.use(ActionBar)
app.use(ActionBarIcon)
app.use(Row)
app.use(Col)
app.use(Card)
app.use(Checkbox)
app.use(DatetimePicker)
app.use(TabbarItem)
app.use(Tabbar)
app.use(Grid)
app.use(GridItem)
app.use(Icon)
app.use(Cell)
app.use(CellGroup)
app.use(Image)
app.use(Search)
app.use(NavBar)
app.use(Tab)
app.use(Tabs)
app.use(Field)
app.use(Toast)
app.use(Form)
app.use(Picker)
app.use(Popup)
app.use(Uploader)
app.use(NumberKeyboard)

app.mount("#app")
