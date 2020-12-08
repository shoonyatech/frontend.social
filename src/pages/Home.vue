<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <!-- <a
          href="https://react.geekle.us/"
          name="home_banner"
          target="_blank"
        >
          <img
            class="home-banner-top"
            src="/images/React_banner.png"
            alt="Home page banner"
          ></a> -->

        <h1>Welcome Fellow Frontend Developers and Designers!</h1>
        <h2>
          Meet your fellow and richen your knowledge , skills, and get your
          dream job here.
        </h2>
        <div class="home desktop">
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[0]})`,
            }"
            class="card"
            @click="onVLogClick()"
          >
            <span>Catch up with</span>
          </b-card>
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[1]})`,
            }"
            class="card"
            @click="onFreelancingClick()"
          >
            <span>All about Freelancing</span>
          </b-card>
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[2]})`,
            }"
            class="card"
            @click="onFreelancerListClick()"
          >
            <span>List of Freelancers</span>
          </b-card>
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[3]})`,
            }"
            class="card"
            @click="onToolTipClick()"
          >
            <span>Tech Tip</span>
          </b-card>
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[4]})`,
            }"
            class="card"
            @click="onCodeChallengeClick()"
          >
            <span>Code Challenge</span>
          </b-card>
          <b-card
            :style="{
              backgroundImage: `url(${imagesUrl[5]})`,
            }"
            class="card"
            @click="onPodcastClick()"
          >
            <span>Podcasts</span>
          </b-card>
        </div>
        <div class="home mobile">
          <div>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[0]})`,
              }"
              class="card"
              @click="onVLogClick()"
            >
              <span>Catch up with</span>
            </b-card>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[1]})`,
              }"
              class="card"
              @click="onFreelancingClick()"
            >
              <span>All about Freelancing</span>
            </b-card>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[4]})`,
              }"
              class="card"
              @click="onCodeChallengeClick()"
            >
              <span>Code Challenge</span>
            </b-card>
          </div>
          <div>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[2]})`,
              }"
              class="card"
              @click="onFreelancerListClick()"
            >
              <span>List of Freelancers</span>
            </b-card>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[3]})`,
              }"
              class="card"
              @click="onToolTipClick()"
            >
              <span>Tech Tip</span>
            </b-card>
            <b-card
              :style="{
                backgroundImage: `url(${imagesUrl[5]})`,
              }"
              class="card"
              @click="onPodcastClick()"
            >
              <span>Podcasts</span>
            </b-card>
          </div>
        </div>
        <b-card>
          <UpcomingEvents
            :infinite-scroll="false"
            :limit="2"
          />
        </b-card><br>
        <b-card>
          <LatestArticles
            :infinite-scroll="false"
            :limit="2"
          />
        </b-card>
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

        <!-- <div class="button-text">
          <a @click="onCourseClick()">Getting Started with Angular</a>
        </div> -->
        <!-- <div class="tool-tip-text">
          <a @click="onBlogClick()">Blogs</a>
        </div> -->
        <Feedback />
        <ComicStrips />
        <div class="join-box">
          <span class="heading">Frontend City Newsletter</span>
          <span
            class="heading"
          >Get out latest news, events, jobs, course, and so on</span>
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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SignInButtons from '@/components/Signin/SignInButtons';
import LatestArticles from '@/components/Learn/LatestArticles';
import UpcomingEvents from '@/components/Events/UpcomingEvents';
import newsletterService from '@/services/newsletter.service';
import ComicStrips from '@/components/ComicStrips/ComicStrips';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import Feedback from '@/components/Feedback/Feedback';

export default {
  name: 'Home',
  components: {
    SignInButtons,
    LatestArticles,
    UpcomingEvents,
    ComicStrips,
    Feedback,
  },
  data() {
    return {
      emailState: null,
      email: '',
      unSubscribe: false,
      loading: true,
      imagesUrl: [
        '/images/catchUp.jpg',
        '/images/freelancing.jpg',
        '/images/freelancer.jpg',
        '/images/techTip.jpg',
        '/images/codeChallenge.png',
        '/images/podcast.jpg',
      ],
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
    onBlogClick() {
      this.$router.push('/blog');
    },
    onVLogClick() {
      this.$router.push('/catchup');
    },
    onToolTipClick() {
      this.$router.push('/tips');
    },
    onCodeChallengeClick() {
      this.$router.push('/challenge');
    },
    onPodcastClick() {
      this.$router.push('/podcasts');
    },
    onFreelancingClick() {
      this.$router.push('/freelancing');
    },
    onCourseClick() {
      this.$router.push('/learn/courses/getting-started-with-angular');
    },
    onFreelancerProjectsClick() {
      this.$router.push('/freelancerProjects');
    },
    onFreelancerListClick() {
      this.$router.push('/job/freelancer');
    },
    checkSignIn() {
      setTimeout(() => {
        this.email = this.isSignedIn
          ? this.$store.state.signedInUser.email
          : '';
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
        unSubscribe: this.unSubscribe,
      };
      this.loading = true;
      newsletterService
        .subscribe(payload)
        .then((response) => {
          eventBus.$emit('show-toast', {
            body: messages.subscribe.subscribeSuccess,
            title: messages.generic.success,
          });
          this.email = '';
          this.loading = false;
        })
        .catch((error) => {
          eventBus.$emit('show-toast', {
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
.mobile {
  display: none !important;
}

@media screen and (max-width: 759px) {
  .desktop {
    display: none !important;
  }

  .mobile {
    display: flex !important;
    width: 100%;
    div {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }
}
.home {
  margin-bottom: 40px;
  widows: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .card {
    width: 170px;
    height: 150px;
    margin: 5px;
    align-items: center;
    justify-content: center;
    color: white;
    background-size: 100% 100%;
    cursor: pointer;
  }
}

h1 {
  color: #3c648b;
  text-align: center;
  font-weight: bolder;
}
h2 {
  color: #2c5783;
  text-align: center;
}

.join-box {
  margin: 0 auto;
  margin-top: 50px;
  padding-bottom: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  align-items: center;
  background-image: url('/images/newsletter.jpg');
  background-size: 100% 100%;
  border-radius: 10px;
  button {
    background-color: black;
  }
}
input {
  border: 1px solid black;
}
.heading {
  color: #fff;
  border: none;
  text-align: center;
  padding: 10px;
  margin: 12px;
  width: 100%;
  display: inline-block;
  font-size: 20px;
}

.button-text {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 5px;
}

.join-box .msg {
  margin-top: 20px;
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
  content: '\2022';
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
