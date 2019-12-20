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
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.join-box {
  width: 100%;
}
</style>
