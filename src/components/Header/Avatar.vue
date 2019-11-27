<template>
  <div
    class="host"
    @click="toggleMenu()"
  >
    <img
      :src="profilePic"
      class="profile-photo"
    >
    <div
      v-if="showMenu"
      class="menu"
    >
      <div @click="redirect('/me')">
        Profile
      </div>
      <div @click="signout()">
        Sign out
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";

export default {
  components: {},
  props: {
    profilePic: {
      type: String,
      default: ""
    }
  },
  data() {
    return { showMenu: false };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    signout() {
      userService.signout();
      this.redirect("/");
    },
    redirect(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.host {
  position: relative;
}

.profile-photo {
  height: 50px;
  width: 50px;
  background-color: #aada18;
  margin-right: 10px;
  text-align: left;
  padding: 2px;
  border-radius: 999px;
}

.menu {
  width: 140px;
  padding: 2px 20px;
  border: solid 1px #aada18;
  position: absolute;
  right: 0px;
  top: 55px;
  background-color: #fff;
  text-align: left;
}

.menu :hover {
  color: #2c3e50;
}
</style>
