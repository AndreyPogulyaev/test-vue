import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueNativeSock from 'vue-native-websocket';

Vue.config.productionTip = false;

Vue.use(VueNativeSock, process.env.VUE_APP_WEBSOCKET_ADDR, {
  store: store,
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
  connectManually: true,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
