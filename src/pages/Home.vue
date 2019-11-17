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
          <facebook-login
            class="social-button"
            app-id="311503802832589"
          />
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import FacebookLogin from "@/components/Signin/FacebookLogin.vue";

export default {
  name: "Home",
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

.social-button {
  font-size: 0.75rem;
  padding: 0 !important;
}
</style>
