<template>
  <div class="host">
    <div
      v-if="user"
      @click="toggleMenu()"
    >
      <img
        :src="user.profilePic"
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
    <div v-else>
      <img
        src="/images/avatar.svg"
        class="profile-photo placeholder"
        @click="redirect('/signin')"
      >
    </div>
  </div>
</template>

<script>
import userService from "@/services/user.service";
import store from "@/vuex/store";

export default {
  components: {},
  props: {
    user: {
      type: Object,
      default: () => {}
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
      this.$store.commit("signInUser", null);

      this.redirect("/");
    },
    redirect(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  position: relative;
}

.profile-photo {
  height: 50px;
  width: 50px;
  background-color: #114273;
  margin-right: 10px;
  text-align: left;
  padding: 2px;
  border-radius: 999px;
  cursor: pointer;

  &.placeholder {
    background-color: white;
    border-width: 2px;
    padding: 3px;
    border-style: solid;
  }
}

.menu {
  width: 140px;
  padding: 2px 20px;
  border: solid 1px #114273;
  position: absolute;
  right: 0px;
  top: 55px;
  background-color: #fff;
  text-align: left;
}

.menu :hover {
  color: #2c3e50;
}

.signin {
  margin: 10px 0;
  padding: 0 5px;
}
</style>
