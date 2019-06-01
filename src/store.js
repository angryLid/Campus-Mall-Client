import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export const store = new Vuex.Store({
	state: {
		love: ''
	},

	mutations: {
		change(state, love) {
			state.love = love;
		}
	},
	getters: {
		love: (state) => state.love
	}
});
