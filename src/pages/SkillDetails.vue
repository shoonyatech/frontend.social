<template>
  <div class="skill">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <SkillTags
            class="skills-tag"
            :skills="allSkills"
          />
          <div class="title">
            {{ title() }}
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <UpcomingEvents :skill="skill" />
          <LatestArticles :skill="skill" />
          <LatestJobsFromCity
            :skill="$route.params.skill"
            :related-skill="true"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import capitalize from "capitalize";
import learnService from "@/services/learn.service";
import eventService from "@/services/event.service";
import jobService from "@/services/job.service";
import userService from "@/services/user.service";
import skillService from "@/services/skill.service";

import LatestArticles from "@/components/Learn/LatestArticles";
import UpcomingEvents from "@/components/Events/UpcomingEvents";
import SkillTags from "@/components/Skills/SkillTags";
import LatestJobsFromCity from "@/components/Job/LatestJobsFromCity"

export default {
  name: "Skills",
  components: { LatestArticles, UpcomingEvents, SkillTags, LatestJobsFromCity },
  data() {
    return {
      skill: null,
      events: [],
      jobs: [],
      articles: [],
      users: [],
      allSkills: [],
      loading: true,
    };
  },
  created() {
    this.skill = this.$route.params.skill;

    eventService.searchEventsBy(`skills=${this.skill}`).then(events => {
      this.events = events;
    });

    skillService.fetchSkills().then(skills => {
      this.allSkills = skills.map(s => s.name);
    });
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  },
  methods: {
    title() {
      return capitalize.words(this.skill);
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #aada18;
}

.skills-tag {
  text-align: right;
}

.skills {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}
</style>
