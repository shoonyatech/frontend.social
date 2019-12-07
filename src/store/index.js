import Vue from "vue";
import Vuex from "vuex";
import filters from "./modules/filters";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    filters
  },
  strict: debug
});
