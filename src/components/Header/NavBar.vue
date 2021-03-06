<template>
  <nav>
    <div class="static-header mobile">
      <a
        class="main-logo"
        href="/"
      >
        <span class="image-container">
          <img
            src="/images/logo.png"
            alt="Front.Social"
          >
        </span>
      </a>
      <Avatar
        class="mobile avatar"
        :user="signedInUser"
      />
      <div class="menu-icon">
        <div class="toggle">
          <input
            id="theme-toggle"
            type="checkbox"
            :checked="isDarkMode"
            @change="$emit('toggle-theme')"
          >
          <label for="theme-toggle" />
        </div>
      </div>
    </div>
    <div class="static-header desktop">
      <a
        class="main-logo desktop-mage"
        href="/"
      >
        <span class="image-container">
          <img
            src="/images/logo.png"
            alt="Front.Social"
          >
        </span>
      </a>
    </div>
    <ul
      ref="nav"
      class="nav-items"
    >
      <li
        :key="'signin'"
        class="nav-item right"
      >
        <div class="nav-item-link">
          <Avatar
            class="desktop"
            :user="signedInUser"
          />
          <div
            v-if="!signedInUser"
            class="nav-item-link mobile"
            @click="redirect('/signin')"
          >
            Sign in
          </div>
        </div>
      </li>
      <li class="nav-item">
        <div class="toggle">
          <input
            id="theme-toggle"
            type="checkbox"
            :checked="isDarkMode"
            @change="$emit('toggle-theme')"
          >
          <label for="theme-toggle" />
        </div>
      </li>
    </ul>
    <div class="desktop">
      <SideNav
        :menu="navLinks"
        :is-dark-mode="isDarkMode"
        :theme="theme"
      />
    </div>
    <div class="mobile">
      <NavigationTabs :menu="navLinks" />
    </div>
  </nav>
</template>

<script>
import store from '@/vuex/store';
import Avatar from '@/components/Header/Avatar';
import SideNav from '@/components/Header/SideNav';
import NavigationTabs from '@/components/Header/NavigationTabs';

export default {
  components: { Avatar, SideNav, NavigationTabs },
  props: {
    navLinks: {
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
  },
};
</script>

<style scoped lang="scss">
.static-header {
  min-width: 200px;
  display: flex;
  .menu-icon {
    display: none;
  }
  .desktop-mage {
    margin-left: 50px;
  }
  .main-logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 280px;
    img {
      width: 100%;
    }
    .image-container {
      padding: 9px 10px 0 10px;
      height: 55px;
    }
  }
}

nav {
  display: flex;
  min-height: 55px;
  width: 100%;
  .nav-items {
    display: flex;
    flex-grow: 0.2;
    align-items: center;
    justify-content: flex-end;
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
      padding: 0 20px;
      font-size: 24px;
      cursor: pointer;
      .nav-item-link {
        color: var(--fs-secondary-color) !important;
        width: 100%;
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

.mobile {
  display: none !important;
}

@media screen and (max-width: 759px) {
  .desktop {
    display: none !important;
  }

  .mobile {
    display: flex !important;
  }

  .avatar {
    margin-top: 5px;
  }
  .static-header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
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
      font-size: 45px;
      padding-right: 30px;
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
      font-weight: bold;
    }
  }
}
li.nav-item a.nav-item-link.exact-active.active {
  font-weight: bold;
  background-color: #11427334;
  text-decoration: none;
}
a.nav-item-link:hover {
  background-color: #11427334;
  text-decoration: none;
}
a.nav-item-link {
  padding: 10px 10px;
}

.toggle {
  width: 80px;
  margin-top: -15px;

  input[type='checkbox'] {
    display: none;
  }

  label {
    position: relative;
  }

  input[type='checkbox'] + label::before {
    content: ' ';
    display: block;
    height: 26px;
    width: 45px;
    border: 1px solid var(--fs-secondary-color);
    border-radius: 20px;
    position: absolute;
    top: 0px;
    background: white;
  }

  input[type='checkbox']:checked + label::before {
    background: black;
    transition: all 0.5s ease-in;
  }

  input[type='checkbox'] + label::after {
    content: ' ';
    display: block;
    height: 20px;
    width: 20px;
    border: 1px solid var(--fs-secondary-color);
    border-radius: 50%;
    position: absolute;
    top: 3px;
    left: 0px;
    background: var(--fs-secondary-color);
    transition: all 0.5s ease-in;
  }

  input[type='checkbox']:checked + label::after {
    left: 23px;
    transition: all 0.5s ease-in;
  }
}
</style>
