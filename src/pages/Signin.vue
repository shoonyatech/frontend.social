<template>
  <b-container>
    <Loader v-show="loading" />
    <b-row>
      <b-col md="12">
        <div class="sign-in">
          <div class="join-box">
            <div class="label">
              Please sign in to see customized results and interact with others
              on the page
            </div>
            <SignInButtons />
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";

export default {
  components: {
    SignInButtons
  },
  data() {
    return {
      loading: true
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.join-box {
  width: 100%;
  text-align: center;
  margin-top: 40px;

  .label {
    margin-bottom: 20px;
  }
}
</style>
