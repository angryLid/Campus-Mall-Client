import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        permission: false,
        checkedIn: false
    },

    mutations: {
        permit(state) {
            state.permission = true;
        },
        success(state) {
            state.checkedIn = true;
        }
    },
    getters: {
        permission: state => state.permission,
        checkedIn: state => state.checkedIn
    }
});
