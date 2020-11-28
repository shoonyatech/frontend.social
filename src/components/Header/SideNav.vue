<template>
  <div>
    <SidebarMenu
      :menu="menu"
      :collapsed="true"
      :disable-hover="true"
      :theme="theme"
      @toggle-collapse="onToggleCollapse"
    >
      <div v-if="!collapse" slot="header" class="footer">
        <div v-if="signedInUser" @click="signout()">
          <hr />
          <span> <i class="fa fa-sign-out" aria-hidden="true" /> Logout</span>
        </div>

        <hr />
        <span><router-link :to="'/privacy'"> Privacy Policy</router-link></span>
        <br /><span
          ><router-link :to="'/terms'"> Term of Use</router-link></span
        >
        <hr />
        <span>Follow</span>
        <span class="social">
          <a
            name="slack"
            rel="noopener"
            href="https://join.slack.com/t/shoonya-tech/shared_invite/zt-i783y3rk-5I97wQmTZ~4zchNZdKJs2w"
            target="_blank"
            ><img class="social-image" src="/images/slack.svg"
          /></a>
          <a
            name="twitter"
            class="social-image"
            rel="noopener"
            href="https://twitter.com/frontendsocial"
            target="_blank"
          >
            <img class="social-image" src="/images/twitter.svg"
          /></a>
          <a
            v-if="!isDarkMode"
            name="github"
            class="social-image"
            rel="noopener"
            href="https://github.com/shoonyatech/frontend.social"
            target="_blank"
          >
            <img class="social-image" src="/images/github.svg"
          /></a>
          <a
            v-if="isDarkMode"
            name="github"
            class="social-image"
            rel="noopener"
            href="https://github.com/shoonyatech/frontend.social"
            target="_blank"
          >
            <img class="social-image" src="/images/github.png"
          /></a>
        </span>
      </div>
      <span slot="toggle-icon" class="icon"
        ><i class="fa fa-bars" aria-hidden="true" />
        <span v-if="!collapse" href="/">
          <img
            :style="{ width: '200px' }"
            src="/images/logo.png"
            alt="Front.Social"
          />
        </span>
      </span>
    </SidebarMenu>
  </div>
</template>

<script>
import store from '@/vuex/store';
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import userService from '@/services/user.service';

export default {
  components: { SidebarMenu },
  props: {
    menu: {
      type: Array,
      required: true,
    },
    isDarkMode: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'white-theme',
    },
  },
  data() {
    return {
      collapse: true,
    };
  },

  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  methods: {
    signout() {
      userService.signout();
      this.$store.commit('signInUser', null);
      this.redirect('/');
    },
    redirect(path) {
      this.$router.push(path);
    },
    onToggleCollapse(collapsed) {
      this.collapse = collapsed;
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  cursor: pointer;
}
.footer span {
  margin-left: 20px;
}
.footer span:hover {
  font-weight: bolder;
}
.icon {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
}
.v-sidebar-menu {
  border: 1px solid lightgray;
  font-size: 20px;
  display: flex;
  flex-direction: column-reverse;
}
.social {
  .social-image {
    height: 30px;
    width: 30px;
    margin: 5px;
  }
}
</style>
