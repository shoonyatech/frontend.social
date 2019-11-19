<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <h1>Find out What's new!</h1>
        <div class="home">
          This is a platform for Frontend Developers and Designers. Meet fellow
          developers and designers in your city meetups, see latest blogs and
          videos, learn from online courses and find jobs matching your skills!!
        </div>
        <LatestArticles />
      </b-col>
      <b-col md="3">
        <div class="join-box">
          <span class="join-label">Join for Free</span>
          <div class="buttons">
            <SignInButtons />
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";
import LatestArticles from "@/components/Learn/LatestArticles";

export default {
  name: "Home",
  components: { SignInButtons, LatestArticles },
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
          this_.isAuthenticated = this_.$auth.isAuthenticated();

          if (provider === "github") {
            this_.$http
              .get("https://api.github.com/user")
              .then(function(response) {
                this_.response = response;
              });
          } else if (provider === "facebook") {
            this_.$http
              .get("https://graph.facebook.com/v5.0/me", {
                params: { access_token: this_.$auth.getToken() }
              })
              .then(function(response) {
                this_.response = response;
              });
          } else if (provider === "google") {
            this_.$http
              .get("https://www.googleapis.com/plus/v1/people/me/openIdConnect")
              .then(function(response) {
                this_.response = response;
              });
          } else if (provider === "twitter") {
            this_.response = authResponse.body.profile;
          } else if (provider === "instagram") {
            this_.response = authResponse;
          } else if (provider === "bitbucket") {
            this_.$http
              .get("https://api.bitbucket.org/2.0/user")
              .then(function(response) {
                this_.response = response;
              });
          } else if (provider === "linkedin") {
            this_.response = authResponse;
          } else if (provider === "live") {
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
  margin-bottom: 40px;
}

.join-box {
  border: 2px solid #aada20;
  margin: 0 auto;
  padding-bottom: 5px;
}

.join-box .msg {
  margin-top: 20px;
}

.join-label {
  background: #aada20;
  color: #fff;
  border: none;
  padding: 4px;
  margin-bottom: 12px;
  width: 100%;
  display: inline-block;
}

.buttons {
  padding: 0;
}
</style>
