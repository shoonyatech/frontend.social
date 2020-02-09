<template>
  <b-row
    v-if="!userAcceptedCookiesYet"
    class="content"
  >
    <b-col md="12">
      <div>
        <div>
          We use cookies and other tracking technologies to improve the browsing
          experience on our website, to analyze our traffic and to provide
          social media functionalities.
        </div>
        <div>
          To find out more or to opt-out, please read
          <a
            href="/privacy"
            class="static-links"
            target="_blank"
          >Privacy Policy</a>.
        </div>
        <div>
          By choosing I Accept you consent to our use of cookies and other
          tracking technologies.
        </div>
        <div class="buttons">
          <button @click="accept()">
            I Accept
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
      userAcceptedCookiesYet: true
    };
  },
  created() {
    setTimeout(() => {
      this.userAcceptedCookiesYet =
        $cookies.get("cookies-accepted") === "true" || false;
    }, 120000);
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
  z-index: 10;
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
