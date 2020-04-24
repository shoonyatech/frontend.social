<template>
  <div class="buttons-box">
    <button
      class="social-button google"
      @click="authenticate('google')"
    >
      Sign in with Google
    </button>
    <button
      class="social-button fb"
      @click="authenticate('facebook')"
    >
      Sign in with Facebook
    </button>
    <button
      class="social-button github"
      @click="authenticate('github')"
    >
      Sign in with Github
    </button>
    <button
      class="social-button twitter hidden"
      @click="authenticate('twitter')"
    >
      Sign in with Twitter
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    authenticate: function(provider) {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout();
      }

      this.response = null;

      var this_ = this;
      this.$auth
        .authenticate(provider)
        .then(function(authResponse) {
          this_.isSignedIn = this_.$auth.isAuthenticated();

          if (this_.isSignedIn) {
            let user;
            if (provider === "facebook") {
              user = authResponse.data;
              localStorage.setItem("authToken", JSON.stringify(user.authToken));
              this_.$store.commit("signInUser", user);
            } else if (provider === "github") {
              user = authResponse.data;
              localStorage.setItem("authToken", JSON.stringify(user.authToken));
              this_.$store.commit("signInUser", user);
            } else if (provider === "twitter") {
              user = authResponse.data;
              localStorage.setItem("authToken", JSON.stringify(user.authToken));
              this_.$store.commit("signInUser", user);
            } else if (provider === "google") {
              user = authResponse.data;
              localStorage.setItem("authToken", JSON.stringify(user.authToken));
              this_.$store.commit("signInUser", user);
            } else if (provider === "bitbucket") {
              this_.$http
                .get("https://api.bitbucket.org/2.0/user")
                .then(function(response) {
                  this_.response = response;
                });
            } else if (provider === "linkedin") {
              this_.response = authResponse;
            }

            if (user.city == null || user.city === "") {
              this_.$router.push({ path: "me", query: { msg: "set-city" } });
            } else {
              this_.$router.go(-1);
            }
          }
        })
        .catch(function(err) {
          console.log(err);
          this_.isAuthenticated = this_.$auth.isAuthenticated();
          this_.response = err;
        });
    }
  }
};
</script>

<style scoped lang="scss">
.buttons-box {
  padding-right: 10px;
}

.social-button {
  max-width: 230px;
  margin: 5px 10px;
}
</style>
