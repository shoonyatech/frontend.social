<template>
  <div
    id="app"
    :class="{ 'theme-dark': isDarkMode, 'theme-light': !isDarkMode }"
  >
    <div class="header">
      <NavBar
        :nav-links="navLinks"
        :is-dark-mode="isDarkMode"
        @toggle-theme="toggleTheme"
      />
      <!-- <button @click="isDarkMode=!isDarkMode">
        Mode
      </button> -->
    </div>
    <div class="main">
      <router-view :key="path" />
    </div>
    <Footer :copyright-text="copyrightText" />
    <ToastsManager />
  </div>
</template>

<script>
import userService from "@/services/user.service";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";
import ToastsManager from "@/components/ToastsManager/ToastsManager";
import store from "@/vuex/store";
import io from 'socket.io-client';
import config from "./config/config";

export default {
  components: {
    NavBar,
    Footer,
    ToastsManager
  },
  store,
  data: () => ({
    navLinks: [
      {
        text: "Learn",
        path: "/learn"
      },
      {
        text: "Jobs",
        path: "/jobs"
      },
      {
        text: "Events",
        path: "/events"
      },
      {
        text: "City",
        path: "/city"
      },
      {
        text: "Tools",
        path: "/tools"
      },
      {
        text: "Technologies",
        path: "/tech"
      }
    ],
    isDarkMode: false,
    copyrightText:
      "Powered by Shoonya Technologies Ltd. (Canada) © 2020 All Rights Reserved."
  }),
  computed:  {
    path() {
      return this.$route.fullPath;
    }
  },
  created() {
    this.getTheme();
    if (localStorage.getItem("authToken")) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.$store.commit("signInUser", user);
          // if (user && (user.city == null || user.city === "")) {
          //   this.$router.push({ path: "me", query: { msg: "set-city" } });
          // }
        })
        .catch(e => {});
    } else if(localStorage.getItem('GUEST_USER')) {
      this.$store.commit('setGuestUser', JSON.parse(localStorage.getItem('GUEST_USER')));
    }

    this.$store.dispatch("fetchSkills");
  },
  mounted() {
    var socket = io(config.api);
    socket.on('test-reply', console.log)

    socket.emit('test-event', 'test');
  },
  methods: {
    getTheme() {
      const theme = localStorage.getItem("theme");
      this.isDarkMode = theme === 'DARK';
    },
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem("theme", this.isDarkMode ? 'DARK' : 'LIGHT')
    }
  }
};
</script>

<style lang="scss">
@import "https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css";

 .theme-dark {
  --fs-bg: #282c35;
  --fs-primary-color: #b8daff;
  --fs-secondary-color: #2693FF;  //#114273;
  --fs-link-color: #74DAFC;
}

.theme-light {
  --fs-bg: #fff;
  --fs-primary-color: #2c3e50;
  --fs-secondary-color: #114273;  //#114273;
  --fs-link-color: #1d8db1;
}

html {
  font-size: 22px;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Consolas", "Inconsolata", monospace;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: left;
  justify-content: left;
  overflow-x: hidden;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: var(--fs-primary-color);
  background-color: var(--fs-bg);
  .main {
    min-height: 70vh;
    padding-top: 87px;
    @media screen and (max-width: 759px) {
      padding-top: 70px;
    }
  }
}

.header {
  border-bottom: 7px solid var(--fs-secondary-color);
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: white;
  color: var(--fs-secondary-color);
  z-index: 10;
  background: var(--fs-bg);
}

.icon-button {
  height: 30px;
  padding: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c0e0ff;
    border-radius: 9px;
    border-width: solid transparent 1px;
  }
}

.page {
  min-height: 920px;
}

.text-sm {
  font-size: 0.75rem;
}

.text-xs {
  font-size: 0.6rem;
}

.left {
  display: inline-block;
  justify-content: left;
  text-align: left;
}

.right {
  display: inline-block;
  justify-content: right;
  text-align: right;
}

.inline-block {
  display: inline-block;
}

.page-heading {
  margin-top: 1rem;
}

h1 {
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  border-bottom: 1px solid #114273;
  padding-bottom: 7px;
}

h1 button {
  margin: 2px;
  float: right;
}

h2 {
  font-size: 1.1rem;
  font-weight: 700;
  text-align: left;
  width: 100%;
}

ol {
  padding-left: 0.5rem;
  margin: 0.8rem 0.7rem 0.8rem 1.9em !important;
}

a {
  color: var(--fs-link-color) !important;
  cursor: pointer;
}

a:hover {
  background-color: #11427334;
  text-decoration: none;
}

label {
  display: inline-block;
  color: #114273;
}

button {
  background-color: #114273;
  color: white;
  padding: 0 20px;
  border: 0;

  &.error {
    background-color: rgb(212, 68, 68);
  }
}

button:hover {
  background-color: #38628c;

  &.error {
    background-color: rgba(212, 68, 68, 0.733);
  }
}

.light-text {
  opacity: 0.5;
}

.radio {
  display: flex;
}

.radio-input {
  display: inline-block;
  height: 29px;
  margin-right: 10px;
}

input {
  border: 3px solid #114273;
  display: inline-block;
  margin: 2px 0;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}

.social-button {
  font-size: 0.75rem;
  padding: 5px 10px !important;
  width: 95%;
  margin-bottom: 0.25rem;
}

.google {
  background-color: #4285f4;
  color: #fff;
}

.google:hover {
  background-color: rgba(66, 134, 244, 0.795);
}

.fb {
  background-color: #3c5a99;
  color: #fff;
}

.fb:hover {
  background-color: #3c5999cc;
}

.github {
  background-color: #000;
  color: #fff;
}

.github:hover {
  background-color: rgba(0, 0, 0, 0.664);
}

.twitter {
  background-color: #55acee;
  color: #fff;
}

.twitter:hover {
  background-color: rgba(85, 172, 238, 0.726);
}

.center-content {
  width: 100%;
  text-align: center;
}

.capsule {
  color: var(--fs-bg);
  background-color: var(--fs-primary-color);
  padding: 0 10px;
  border-radius: 50px;
  height: 22px;
  margin: 0 2px;
  float: right;
}

.container {
  max-width: 1280px;
}

.full-width {
  width: 100%;
}

.breadcrumb {
  padding: 0;
  margin: 0;
  background: transparent;
  font-size: 18px;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
}

.hidden {
  display: none;
}

.sub-text {
  font-size: 0.65rem;
}
</style>
