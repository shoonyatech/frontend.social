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
        <div class="mt-2 join-box">
          <span class="join-label">Frontend Newsletter</span>
          <ul class="text-left">
            <li class="newsletter-list">
              Find out online events
            </li>
            <li class="newsletter-list">
              Influencer of the week
            </li>
            <li class="newsletter-list">
              Latest blogs and videos
            </li>
            <li class="newsletter-list">
              Frontend jobs
            </li>
            <li class="newsletter-list">
              Online courses
            </li>
          </ul>
          <form
            ref="form"
            @submit.stop.prevent="handleNewsletterSubmit"
          >
            <b-form-group
              invalid-feedback="Email is required"
              class="buttons-box"
            >
              <input
                v-model.trim="email"
                placeholder="Your email"
                class="w-100 social-button "
                required
                :state="emailState"
              >
              <button class="w-100 social-button ">
                Subscribe
              </button>
            </b-form-group>
          </form>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";
import LatestArticles from "@/components/Learn/LatestArticles";
import UpcomingEvents from "@/components/Events/UpcomingEvents";
import newsletterService from "@/services/newsletter.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Home",
  components: { SignInButtons, LatestArticles, UpcomingEvents },
  data() {
    return {
      emailState: null,
      email: "",
    };
  },
  computed: {
    isSignedIn() {
      return this.$store.state.signedInUser != null;
    },
  },
  mounted() {
    this.checkSignIn();
  },
  methods: {
    checkSignIn() {
      setTimeout(() => {
        this.email = this.isSignedIn
          ? this.$store.state.signedInUser.email
          : "";
      }, 1000);
    },
    checkNewsletterFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.emailState = valid
      return valid
    },
    handleNewsletterSubmit() {
      if (!this.checkNewsletterFormValidity()) {
        return
      }
      const payload = {
        email: this.email,
      };
      newsletterService
        .subscribe(payload)
        .then((response) => {
          eventBus.$emit("show-toast", {
            body: messages.subscribe.subscribeSuccess,
            title: messages.generic.success,
          });
          this.email = "";
        })
        .catch((error) => {
          eventBus.$emit("show-toast", {
            body: messages.subscribe.subscribeFailure,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
  },
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

.buttons-box {
  padding-right: 10px;
}

.social-button {
  max-width: 230px;
  margin: 5px 10px;
}
.newsletter-list {
  font-size: 0.8rem;
  list-style: none;
}
ul li::before {
  content: "\2022";
  color: #aada20;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}
</style>
