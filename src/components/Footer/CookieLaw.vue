<template>
  <b-row
    v-if="!userAcceptedCookiesYet"
    class="content"
  >
    <b-col md="12">
      <div>
        We use cookies to ensure you get the best experience on our website.
        Please read
        <a
          href="/privacy"
          class="static-links"
          target="_blank"
        >Privacy Policy</a>
        for more details.
        <div class="buttons">
          <button
            class="error"
            @click="decline()"
          >
            Opt out
          </button>
          <button @click="accept()">
            Got it
          </button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      userAcceptedCookiesYet: false
    };
  },
  created() {
    this.userAcceptedCookiesYet =
      $cookies.get("cookies-accepted") === "true" || false;
  },
  methods: {
    decline() {
      alert(
        "We use cookies only if you sign in. If you do not sign in into this website, we will not create cookies for you. But we cannot guarantee cookie usage by third party tools. Please read Privacy Policy to find out which third party tools use cookies. If you are not comfortable that we use cookies, then please do not proceed further to use this website as it is not possible to run functionalities of this website without using cookies."
      );
    },
    accept() {
      $cookies.set("cookies-accepted", true);
      this.userAcceptedCookiesYet = true;
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  position: fixed;
  bottom: 0px;
  margin: 10px;
  padding: 20px;
  background-color: darkolivegreen;
  color: white;
}

.buttons {
  padding-top: 10px;
  text-align: right;
}

.error {
  margin-right: 20px;
}
</style>
