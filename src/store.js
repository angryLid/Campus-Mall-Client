import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		love: '',
		checkedIn: false
	},

	mutations: {
		change(state, value) {
			state.value = value;
		},
		success(state) {
			state.checkedIn = true;
		}
	},
	getters: {
		love: (state) => state.love,
		checkedIn: (state) => state.checkedIn
	}
});
