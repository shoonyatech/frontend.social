<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <a
          href="https://react.geekle.us/"
          name="home_banner"
          target="_blank"
        >
          <img
            class="home-banner-top"
            src="/images/React_banner.png"
            alt="Home page banner"
          ></a>

        <h1>Find out What's new!</h1>
        <div class="home">
          This is a platform for Frontend Developers and Designers. Meet fellow
          developers and designers in your city meetups, see latest blogs and
          videos, learn from online courses and find jobs matching your skills!!
        </div>
        <UpcomingEvents
          :infinite-scroll="false"
          :limit="4"
        />
        <LatestArticles
          :infinite-scroll="false"
          :limit="4"
        />
      </b-col>
      <b-col md="3">
        <div
          v-if="!isSignedIn"
          class="join-box mb-2"
        >
          <span class="join-label">Join for Free</span>
          <div class="buttons">
            <SignInButtons />
          </div>
        </div>
        <div class="vlog-text">
          <a @click="onVLogClick()">Catch up with...</a>
        </div>
        <div class="vlog-text">
          <a @click="onFreelancingClick()">All about Freelancing</a>
        </div>
        <div class="tool-tip-text">
          <a @click="onToolTipClick()">Tech Tip</a>
        </div>
        <div class="join-box">
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
              <label
                for="email"
                class="hidden"
              >Email</label>
              <input
                id="email"
                v-model.trim="email"
                placeholder="Your email"
                class="w-100 section-control"
                required
                :state="emailState"
              >
              <button class="w-100 section-control">
                Subscribe
              </button>
            </b-form-group>
          </form>
        </div>
        <ComicStrips />
      </b-col>
    </b-row>
    <Feedback />
  </b-container>
</template>

<script>
import SignInButtons from "@/components/Signin/SignInButtons";
import LatestArticles from "@/components/Learn/LatestArticles";
import UpcomingEvents from "@/components/Events/UpcomingEvents";
import newsletterService from "@/services/newsletter.service";
import ComicStrips from "@/components/ComicStrips/ComicStrips";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import Feedback from "@/components/Feedback/Feedback";

export default {
  name: "Home",
  components: { SignInButtons, LatestArticles, UpcomingEvents, ComicStrips, Feedback },
  data() {
    return {
      emailState: null,
      email: "",
      loading: true,
    };
  },
  computed: {
    isSignedIn() {
      return this.$store.state.signedInUser != null;
    },
  },
  mounted() {
    this.checkSignIn();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    onVLogClick() {
      this.$router.push("/catchup");
    },
    onToolTipClick() {
      this.$router.push("/tips");
    },
    onFreelancingClick() {
      this.$router.push("/freelancing");
    },
    checkSignIn() {
      setTimeout(() => {
        this.email = this.isSignedIn
          ? this.$store.state.signedInUser.email
          : "";
      }, 1000);
    },
    checkNewsletterFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.emailState = valid;
      return valid;
    },
    handleNewsletterSubmit() {
      if (!this.checkNewsletterFormValidity()) {
        return;
      }
      const payload = {
        email: this.email,
      };
      this.loading = true;
      newsletterService
        .subscribe(payload)
        .then((response) => {
          eventBus.$emit("show-toast", {
            body: messages.subscribe.subscribeSuccess,
            title: messages.generic.success,
          });
          this.email = "";
          this.loading = false;
        })
        .catch((error) => {
          eventBus.$emit("show-toast", {
            body: messages.subscribe.subscribeFailure,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
          this.loading = false;
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
  border: 2px solid #114273;
  margin: 0 auto;
  padding-bottom: 5px;
  text-align: center;
}

.vlog-text,
.tool-tip-text {
  border: 2px solid #114273;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 5px;
}

.join-box .msg {
  margin-top: 20px;
}

.join-label {
  background: #114273;
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

.section-control {
  max-width: 230px;
  margin: 5px 10px;
}
.newsletter-list {
  font-size: 0.8rem;
  list-style: none;
}
ul li::before {
  content: "\2022";
  color: var(--fs-primary-color);
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.home-banner-top {
  margin-bottom: 40px;
  width: 100%;
  height: auto;
}
</style>
