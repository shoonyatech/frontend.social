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
      const user = res.data;
      localStorage.setItem("profile", JSON.stringify(user));
      this.$store.commit("signInUser", user);
      this.$router.push("/me");
    });
  },
  methods: {}
};
</script>

<style scoped></style>
