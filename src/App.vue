<template>
  <div id="app">
    <div class="header">
      <NavBar :nav-links="navLinks" />
    </div>
    <div class="main">
      <router-view />
    </div>
    <Footer :copyright-text="copyrightText" />
  </div>
</template>

<script>
import userService from "@/services/user.service";
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";
import store from "@/vuex/store";

export default {
  components: {
    NavBar,
    Footer
  },
  store,
  data: () => ({
    navLinks: [
      {
        text: "Learn",
        path: "/learn",
        icon: "ion-ios-bonfire"
      },
      {
        text: "Jobs",
        path: "/jobs",
        icon: "ion-ios-briefcase"
      },
      {
        text: "Events",
        path: "/events",
        icon: "ion-ios-megaphone"
      },
      {
        text: "City",
        path: "/city",
        icon: "ion-ios-business"
      }
    ],
    copyrightText:
      "Powered by Shoonya Technologies Ltd. (Canada) © 2019 All Rights Reserved."
  }),
  created() {
    if (localStorage.getItem("authToken")) {
      userService
        .getLoggedInUserProfile()
        .then(user => {
          this.$store.commit("signInUser", user);
        })
        .catch(e => {});
    }
  }
};
</script>

<style lang="scss">
@import "https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css";

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
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  .main {
    min-height: 70vh;
    margin-top: 87px;
    @media screen and (max-width: 759px) {
      margin-top: 70px;
    }
  }
}

.header {
  border-bottom: 7px solid #aada18;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  background-color: white;
  color: #aada18;
  z-index: 10;
}

.icon-button {
  background-color: #aada20;
  border: 3px solid white;
  height: 66px;
  width: 66px;
  border-radius: 50%;
  padding: 10px;
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
  border-bottom: 1px solid #aada18;
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
  color: rgb(35, 180, 173) !important;
  cursor: pointer;
}

a:hover {
  background-color: #aada1834;
  text-decoration: none;
}

label {
  display: inline-block;
  color: #aada18;
}

button {
  background-color: #aada18;
  color: white;
  padding: 0 20px;
  border: 0;
}

button:hover {
  background-color: #c5dd7d;
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
  border: 3px solid #aada20;
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
</style>
