import { createStore } from "vuex";

export default createStore({
	state: {
		connected: localStorage.getItem("token") !== null
	},
	mutations: {
		SET_CONNECTED(state) {
			state.connected = !state.connected
		}
	},
	actions: {
		async switchConnected({commit}) {
			commit("SET_CONNECTED");
		}
	}
})