import Account from './views/Account.vue';
import Apply from './views/Apply.vue';
import Cources from './views/Cources.vue';
import Feekback from './views/Feedback.vue';
import Library from './views/Library.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Score from './views/Score.vue';

export default {
	linkActiveClass: 'active',
	routes: [
		{
			path: '/',
			component: Login,
			meta: {
				title: '登录'
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
			path:'/apply',
			component:Apply,
			meta:{
				title:'请假申请'
			}
		},
		{
			path:'/account',
			component:Account,
			meta:{
				title:'账户设置'
			}
		},
		{
			path:'/feedback',
			component:Feekback,
			meta:{
				title:'评价调查',
			}
		},
		{
			path:'/library',
			component:Library,
			meta:{
				title:'借阅管理'
			}
		},
		{
			path:'/score',
			component:Score,
			meta:{
				title:'成绩查询'
			}
		},
	],
};
