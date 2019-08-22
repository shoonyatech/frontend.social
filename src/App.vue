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
import NavBar from "@/components/NavBar/NavBar";
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

body {
  margin: 0;
  font-family: "Consolas,Inconsolata,monospace";
}
.header {
  border-bottom: 7px solid #aada18;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #aada18;
  .main {
    min-height: 70vh;
    margin-top: 87px;
    @media screen and (max-width: 759px) {
      margin-top: 70px;
    }
  }
}
</style>
