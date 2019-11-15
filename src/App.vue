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
import NavBar from "@/components/Header/NavBar";
import Footer from "@/components/Footer/Footer";

export default {
  components: {
    NavBar,
    Footer
  },
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
        text: "Conferences",
        path: "/conferences",
        icon: "ion-ios-megaphone"
      },
      {
        text: "City",
        path: "/city",
        icon: "ion-ios-business"
      }
    ],
    copyrightText:
      "Powered by Shoonya Technologies Ltd. © 2019 All Rights Reserved."
  })
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
  text-align: center;
  justify-content: center;
}

* {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
  width: 100%;
  background-color: white;
  color: #aada18;
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
</style>
