<template>
  <section class="section">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <a :href="redirectUrl">
          <button class="fb">Sign in with Facebook</button>
        </a>
        <div
          v-if="failed"
          class="errors-container"
        >
          <p>Oops! Your facebook login failed.</p>
          <ul>
            <li>Error: {{ error }}</li>
            <li>Description: {{ errorDescription }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      redirectUrl:
        "https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&client_id=311503802832589&redirect_uri=https://www.frontend.social/signin/fb",
      authWindow: null,
      failed: false,
      error: "",
      errorDescription: "",
      isBusy: false,
      errors: ""
    };
  },
  created() {
    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this), false);
    } else {
      window.attachEvent("onmessage", this.handleMessage.bind(this));
    }
  },
  methods: {
    launchFbLogin() {
      // this.authWindow = window.open(
      //   "https://www.facebook.com/v2.11/dialog/oauth?&
      // response_type=token&client_id=311503802832589&redirect_uri=https://localhost:8080/auth/facebook/callback&
      // scope=email",
      //   "",
      //   "width=600,height=400"
      // );
    },
    handleMessage(event) {
      const message = event;
      // Only trust messages from the below origin.
      if (message.origin !== "https://localhost:8080") {
        return;
      }

      if (this.authWindow) {
        this.authWindow.close();
      }

      const result = JSON.parse(message.data);
      if (!result.status) {
        this.failed = true;
        this.error = result.error;
        this.errorDescription = result.errorDescription;
      } else {
        this.failed = false;
        this.isBusy = true;
        this.$store
          .dispatch("auth/facebookAuthRequest", result.accessToken)
          .then(fbResult => {
            this.$router.push("/dashboard/home");
          })
          .catch(err => {
            this.errors = err;
            this.failed = true;
          })
          .then(() => {
            this.isBusy = false;
          });
      }
    }
  }
};
</script>

<style scoped>
.fb {
  background-color: #3c5a99;
  color: #fff;
}
</style>