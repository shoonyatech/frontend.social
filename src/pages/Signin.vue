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
    <b-row>
      <b-col
        md="12"
        class="guest-user"
      >
        <div>Or</div>
        <div>
          <input
            v-model.trim="guestUsername"
            type="text"
            placeholder="Username"
          >
          <button
            :disabled="!guestUsername"
            @click="signInAsUser"
          >
            Continue as Guest
          </button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    SignInButtons
  },
  data() {
    return {
      loading: true,
      guestUsername: '',
    };
  },
  created() {},
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    signInAsUser() {
      const user = {name: this.guestUsername, username: uuidv4()};
      localStorage.setItem('GUEST_USER', JSON.stringify(user));
      this.$store.commit('setGuestUser', user);
      this.$router.go(-1);
    }
  }
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
.guest-user {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
