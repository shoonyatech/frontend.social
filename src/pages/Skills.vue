<template>
  <div class="skill">
    <b-container>
      <b-row>
        <b-col md="12">
          <h1>
            <span>{{ skill }}</span>
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <UpcomingEvents />
          <LatestArticles />
          <div>Jobs</div>
          <div>Devs</div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import learnService from "@/services/learn.service";
import eventService from "@/services/event.service";
import jobService from "@/services/job.service";
import userService from "@/services/user.service";

import LatestArticles from "@/components/Learn/LatestArticles";
import UpcomingEvents from "@/components/Events/UpcomingEvents";

export default {
  name: "Skills",
  components: { LatestArticles, UpcomingEvents },
  data() {
    return {
      skill: null,
      events: [],
      jobs: [],
      articles: [],
      users: []
    };
  },
  created() {
    this.skill = this.$route.params.skill;

    eventService.searchEventsBy(`skills=${this.skill}`).then(events => {
      this.events = events;
    });
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.skills {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}
</style>
