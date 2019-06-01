import Vue from 'vue';
import App from './App.vue';
//import Vuex
import { store } from './store';
// import vue-router
import VueRouter from 'vue-router';
import routerConfig from './router';
Vue.use(VueRouter);
var router = new VueRouter(routerConfig);
// import element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//import vue-easytable
import 'vue-easytable/libs/themes-base/index.css';
import { VTable, VPagination } from 'vue-easytable';
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);

new Vue({
	el: '#app',
	router: router,
	store,
	render: (h) => h(App)
});
/* */

router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = `${to.meta.title} - 教学服务平台`;
	}
	next();
});
