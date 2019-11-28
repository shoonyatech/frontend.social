<template>
  <div class="sign-in">
    <div>Sign in to see customized results for you</div>
    <div class="join-box">
      <SignInButtons />
    </div>
  </div>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";

export default {
  components: {
    SignInButtons
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
.join-box {
  width: 100%;
}
</style>
