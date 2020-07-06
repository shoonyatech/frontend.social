<template>
  <div>
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <h1>
            <span>Coding Challenge</span>
            <button
              v-if="$store.getters.isAdmin"
              @click="onAddChallenge"
            >
              + Add Challenge
            </button>
          </h1>
          <div
            class="challenges"
          >
            <ChallengeStrip
              v-for="challenge in challenges"
              :key="challenge._id"
              :challenge="challenge"
              @delete="onDelete($event)"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChallengeStrip from "@/components/Challenge/ChallengeStrip";
import challengesService from "@/services/challenges.service";

export default {
  name: "Challenges",
  components: {
    ChallengeStrip,
  },
  data() {
    return {
      challenges: [],
      totalPages: 1,
      pageNo: 1,
      loading: false
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  mounted() {
    this.loading = true;
    challengesService.getChallenges()
      .then(resp => {
        this.challenges = resp;
        this.loading = false;
      });
  },
  methods: {
    onAddChallenge() {
      this.$router.push("/challenge/form/new");
    },
    onDelete(id) {
      this.loading = true;
      challengesService.deleteChallenge(id).then(resp => {
        this.challenges = this.challenges.filter(challenge => challenge._id !== id);
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.host {
  width: 100%;
}

.challenges {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.filters-wrapper {
  height: 100%;
  border-left: 1px solid #114273;
  flex-direction: column;
  display: flex;
  text-align: start;
  padding: 10px;
  cursor: pointer;
}
</style>
