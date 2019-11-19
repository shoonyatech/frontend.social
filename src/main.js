import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueAxios from "vue-axios";
import axios from "axios";
import VueAuthenticate from "vue-authenticate";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  tokenName: "access_token",
  baseUrl: "http://localhost:3000/",
  storageType: "cookieStorage",
  providers: {
    facebook: {
      name: "facebook",
      url: "fb-signin",
      authorizationEndpoint: "https://www.facebook.com/v5.0/dialog/oauth",
      redirectUri: "http://localhost:8080/signin/fb",
      requiredUrlParams: ["display", "scope"],
      scope: ["email"],
      scopeDelimiter: ",",
      display: "popup",
      oauthType: "2.0",
      popupOptions: { width: 580, height: 400 },
      clientId: "",
      clientSecret: ""
    },
    github: {
      clientId: "",
      redirectUri: "http://localhost:8080/auth/callback" // Your client app URL
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
