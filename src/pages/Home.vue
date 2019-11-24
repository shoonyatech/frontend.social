<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <h1>Find out What's new!</h1>
        <div class="home">
          Hangout with Frontend Developers and Designers. Meet fellow developers
          and designers in your city meetups, learn from online courses and find
          jobs matching your skills!!
        </div>
      </b-col>
      <b-col md="3">
        <div class="join-box">
          <span class="join-label">Join for Free</span>
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
            class="social-button twitter"
            @click="authenticate('twitter')"
          >
            Sign in with Twitter
          </button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      isSignedIn: false
    };
  },
  created() {
    this.isSignedIn = false;
  },
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

          if (provider === "facebook") {
            const user = authResponse.data;
            localStorage.setItem("profile", JSON.stringify(user));
            this_.$store.commit("signInUser", user);
            this_.$router.push("/me");
          } else if (provider === "github") {
            this_.$http
              .get("https://api.github.com/user")
              .then(function(response) {
                const user = response.data;
                localStorage.setItem("profile", JSON.stringify(user));
                this_.$store.commit("signInUser", user);
                this_.$router.push("/me");
              });
          } else if (provider === "twitter") {
            const user = authResponse.data.profile;
            localStorage.setItem("profile", JSON.stringify(user));
            this_.$store.commit("signInUser", user);
            this_.$router.push("/me");
          } else if (provider === "bitbucket") {
            this_.$http
              .get("https://api.bitbucket.org/2.0/user")
              .then(function(response) {
                this_.response = response;
              });
          } else if (provider === "linkedin") {
            this_.response = authResponse;
          }
        })
        .catch(function(err) {
          this_.isAuthenticated = this_.$auth.isAuthenticated();
          this_.response = err;
        });
    }
  }
};
</script>

<style scoped>
.home {
  text-align: left;
}

.join-box {
  border: 2px solid #aada20;
  max-width: 417px;
  height: 200px;
  margin: 0 auto;
}

.join-box .msg {
  margin-top: 20px;
}

.join-label {
  background: #aada20;
  color: #fff;
  border: none;
  padding: 4px;
  margin-bottom: 20px;
  width: 100%;
  display: inline-block;
}
</style>
