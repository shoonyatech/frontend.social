import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signedInUser: null
  },
  mutations: {
    signInUser(state, user) {
      state.signedInUser = user;
    }
  }
});
