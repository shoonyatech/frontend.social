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
        <UpcomingEvents />
        <LatestArticles />
      </b-col>
      <b-col md="3">
        <div
          v-if="!isSignedIn"
          class="join-box"
        >
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
import UpcomingEvents from "@/components/Events/UpcomingEvents";

export default {
  name: "Home",
  components: { SignInButtons, LatestArticles, UpcomingEvents },
  computed: {
    isSignedIn() {
      return this.$store.state.signedInUser != null;
    }
  },
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.home {
  text-align: left;
  margin-bottom: 40px;
}

.join-box {
  border: 2px solid #aada20;
  margin: 0 auto;
  padding-bottom: 5px;
  text-align: center;
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
