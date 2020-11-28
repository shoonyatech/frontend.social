<template>
  <div>
    <div class="navbar">
      <span v-for="(link, index) in menu" :key="index"
        ><router-link :to="link.href">
          <i :class="link.icon"
            ><p>{{ link.title }}</p></i
          >
        </router-link></span
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavigationTabs',
  props: {
    menu: {
      type: Array,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
}

.navbar i {
  display: block;
  color: #1d8db1;
  text-align: center;
  text-decoration: none;
  font-size: 22px;
}
.navbar p {
  font-size: 11px;
}

.navbar i:hover {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 30px;
  color: white;
}
</style>
