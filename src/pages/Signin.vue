<template>
  <div class="sign-in">
    <h2>Sign in to see customized results for you</h2>
    <!-- <facebook-login class="button" appId="311503802832589"></facebook-login> -->
  </div>
</template>

<script>
// import FacebookLogin from "@/components/FacebookLogin.vue"; // @ is an alias to /src

export default {
  components: {
    // FacebookLogin
  },
  data() {
    return {
      isSignedIn: false
    };
  },
  created() {
    this.isSignedIn = false;
  },
  methods: {}
};
</script>


<style scoped>
</style>
