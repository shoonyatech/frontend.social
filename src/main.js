import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueAuthenticate from "vue-authenticate";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import authOptions from "./config/authOptions";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, authOptions);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
