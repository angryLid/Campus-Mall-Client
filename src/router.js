import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import { store } from './store';
import Account from './views/Account.vue';
import Apply from './views/Apply.vue';
import Cources from './views/Cources.vue';
import Feekback from './views/Feedback.vue';
import Library from './views/Library.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Score from './views/Score.vue';

export const router = new VueRouter({
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: Login,
			meta: {
				title: '登录'
			},
			beforeEach: (to, from, next) => {
				if (store.state.checkedIn) {
					next('/account');
				}
			}
		},
		{
			path: '/register',
			component: Register,
			meta: {
				title: '注册'
			}
		},
		{
			path: '/cources',
			component: Cources,
			meta: {
				title: '选课'
			}
		},
		{
			path: '/apply',
			component: Apply,
			meta: {
				title: '请假申请'
			}
		},
		{
			path: '/account',
			component: Account,
			meta: {
				title: '账户设置'
			}
		},
		{
			path: '/feedback',
			component: Feekback,
			meta: {
				title: '评价调查'
			}
		},
		{
			path: '/library',
			component: Library,
			meta: {
				title: '借阅管理'
			}
		},
		{
			path: '/score',
			component: Score,
			meta: {
				title: '成绩查询'
			}
		}
	]
});
// dynamic HTML title
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = `${to.meta.title} - 教学服务平台`;
	}
	next();
});
