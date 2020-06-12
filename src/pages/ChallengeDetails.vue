<template>
  <b-container
    v-if="!failedToFindChallenge"
    class="bv-example-row"
  >
    <Loader v-show="loading" />
    <b-row class="challenge-details-container">
      <b-col md="12">
        <b-row>
          <b-col
            md="12"
            class="challenge-title"
          >
            <span>{{ challenge.title }}</span>
            <span
              v-if="challenge.published"
              class="capsule"
            >Vote the winner</span>
            <span
              v-else
              class="capsule"
            >Active</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="11">
            <div class="challenge-date sub-text">
              <span v-if="challenge.startTime">
                {{
                  challenge.startTime
                    | moment("DD MMM YYYY")
                }}
              </span>
              <span v-if="challenge.endTime">-</span>
              <span v-if="challenge.endTime">
                {{
                  challenge.endTime
                    | moment("DD MMM YYYY")
                }}
              </span>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            class="sub-text"
          >
            <SkillTags
              v-if="challenge.tags"
              :skills="challenge.tags"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            style="margin-top: 10px"
          >
            <h1>Problem Statement</h1>
            <div v-html="challenge.problemStatement" />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <h1>Submissions</h1>
            <AddSubmission
              v-if="!challenge.published"
              :challenge-id="challengeId"
              @save="onSubmit"
            />
            <Submission
              v-for="submission in submissions"
              :key="submission._id"
              :published="challenge.published"
              :submission="submission"
              :winner-id="challenge.winnerSubmissionId"
              @upvote="onUpVote(submission._id)"
              @downvote="onDownVote(submission._id)"
            />
          </b-col> 
        </b-row>
      </b-col>
    </b-row>
  </b-container>
  <h1
    v-else
    class="fail-message"
  >
    Opps! Failed to find Challenge details
  </h1>
</template>
<script>
import AddSubmission from '@/components/Challenge/AddSubmission';
import Submission from '@/components/Challenge/Submission';
import challengeService from "@/services/challenges.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import SkillTags from "@/components/Skills/SkillTags";

export default {
  name: "ChallengeDetails",
  components: {
    AddSubmission,
    Submission,
    SkillTags,
  },
  data() {
    return {
      failedToFindChallenge: false,
      challengeId: null,
      challenge: {},
      loading: true,
      submissions: [],
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  async created() {
    this.loading = true;
    this.challengeId = this.$route.params.id;
    if (!this.challengeId) {
      this.failedToFindChallenge = true;
      return;
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.signedInUser == null) {
        this.$router.push("/signin");
        return;
      }
    }, 1000);

    this.getChallenge();
    this.getSubmissions();
  },
  methods: {
    onSubmit() {
      this.getSubmissions();
    },
    getChallenge() {
      return challengeService
      .getChallengeById(this.challengeId)
      .then(challenge => {
        this.challenge = challenge;
        this.loading = false;
      })
      .catch(() => {
        this.failedToFindChallenge = true;
        this.loading = false;
      });
    },
    getSubmissions() {
      return challengeService.getSubmissions(this.challengeId)
        .then(submissions => {
          this.submissions = submissions;
        })
    },
    async onUpVote(id) {
      const submission = await challengeService.upVote(id);
      this.submissions = this.submissions.map((s) => {
        if (s._id === id) {
          return submission;
        }
        return s;
      });
    },
    async onDownVote(id) {
      const submission = await challengeService.downVote(id);
      this.submissions = this.submissions.map((s) => {
        if (s._id === id) {
          return submission;
        }
        return s;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.challenge-title {
  display: flex;
  justify-content: space-between;
}

.challenge-type {
  font-size: 0.65rem;
  float: right;

  &.online {
    background: #c50606;
    color: white;
  }
}

.fail-message {
  text-align: center;
}

.youtube-container {
  padding: 10px 0;
}

.icon-links {
  display: flex;
  flex-direction: row-reverse;
}

.capsule {
  font-size: 0.65rem;
}

</style>
