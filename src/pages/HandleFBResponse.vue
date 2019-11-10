<template>
  <div class="sign-in">
    <div>Signing in...</div>
  </div>
</template>

<script>
import userService from "@/services/user.service";

export default {
  components: {},
  data() {
    return {};
  },
  created() {
    const queryParams = this.$route.hash.split("&");
    const accessTokenParam = queryParams.find(q =>
      q.startsWith("#access_token=")
    );
    const accessToken = accessTokenParam.substr(
      accessTokenParam.indexOf("=") + 1
    );
    userService.fbSignin(accessToken).then(res => {
      localStorage.setItem("profile", JSON.stringify(res.data));
      window.location.href = "/me";
    });
  },
  methods: {}
};
</script>


<style scoped>
</style>
