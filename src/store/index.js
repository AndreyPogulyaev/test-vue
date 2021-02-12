import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
      isReconnect: false,
    },
  },
  getters: {
    socket(state) {
      return state.socket;
    },
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event);
    },
    SOCKET_ONMESSAGE(state, message) {
      state.socket.message = message;
    },
    SOCKET_RECONNECT(state) {
      state.socket.isReconnect = true;
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {},
  plugins: [
    createPersistedState({
      paths: ['windows'],
    }),
  ],
});
