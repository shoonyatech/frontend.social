<template>
  <div class="sign-in">
    <div>Sign in to see customized results for you</div>
    <facebook-login
      class="button"
      app-id="311503802832589"
    />
  </div>
</template>

<script>
import FacebookLogin from "@/components/Signin/FacebookLogin.vue";

export default {
  components: {
    FacebookLogin
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
