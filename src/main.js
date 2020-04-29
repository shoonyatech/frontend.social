import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueAuthenticate from "vue-authenticate";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";
import authOptions from "./config/authOptions";
import VueMoment from "vue-moment";
import moment from "moment-timezone";
import VueCookies from "vue-cookies";
import VueYoutube from 'vue-youtube'

import CKEditor from '@ckeditor/ckeditor5-vue';
import Loader from '@/components/common/Loader';
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(CKEditor);
Vue.use(infiniteScroll);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, authOptions);
Vue.use(VueYoutube)
Vue.component('Loader', Loader)

Vue.use(VueMoment, {
  moment
});
Vue.use(require("vue-country-region-select"));
Vue.use(VueCookies);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
