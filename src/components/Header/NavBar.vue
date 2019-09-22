<template>
  <nav>
    <div class="static-header">
      <div class="main-logo">
        <img src="/images/logo.jpg">
      </div>
      <div class="menu-icon">
        <i
          class="ion-ios-menu"
          @click="toggleNav"
        />
      </div>
    </div>
    <ul
      ref="nav"
      class="nav-items"
    >
      <li
        v-for="(link, index) in navLinks"
        :key="index"
        class="nav-item"
      >
        <div
          class="nav-item-link"
          @click="redirect(link.path)"
        >
          {{ link.text }}
          <i
            :class="link.icon"
            icon
          />
        </div>
      </li>
      <li
        :key="'signin'"
        class="nav-item right"
      >
        <div
          class="nav-item-link"
          @click="redirect('/signin')"
        >
          Sign in
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    navLinks: {
      type: Array,
      required: true
    }
  },
  methods: {
    toggleNav() {
      const nav = this.$refs.nav.classList;
      nav.contains("active") ? nav.remove("active") : nav.add("active");
    },
    redirect(path) {
      this.toggleNav();
      this.$router.push(path);
    }
  }
};
</script>

<style scoped lang="scss">
.static-header {
  min-width: 200px;
  display: flex;
  .menu-icon {
    display: none;
  }
  .main-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 245px;
    padding-left: 10px;
    img {
      height: 25px;
      width: 100%;
    }
  }
}

nav {
  display: flex;
  min-height: 60px;
  width: 100%;
  .nav-items {
    display: flex;
    flex-grow: 0.2;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    width: 100%;
    figure {
      cursor: pointer;
      margin-right: 10px;
    }

    i {
      margin-right: 10px;
      font-size: 22px;
    }
    .nav-item {
      list-style-type: none;
      padding: 10px 20px;
      font-size: 24px;
      cursor: pointer;
      .nav-item-link {
        color: #aada18;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
      }
      &:hover {
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 759px) {
  .static-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 20;
    .main-logo {
      display: flex;
      align-items: center;
      width: 245px;
      padding-left: 10px;
    }
    .menu-icon {
      display: flex;
      font-size: 55px;
      padding-right: 20px;
    }
  }
  nav {
    display: flex;
    flex-direction: column;
    .nav-items {
      display: none;
    }
    .nav-items.active {
      margin: 0;
      margin-top: 60px;
      display: flex;
      align-items: center;
      padding: 10px;
      flex-direction: column;
    }
  }
}
</style>
