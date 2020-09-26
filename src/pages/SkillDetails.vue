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
        <b-col md="9">
          <UpcomingEvents :skill="skill" />
          <LatestArticles :skill="skill" />
          <LatestJobsFromCity
            :skill="$route.params.skill"
            :related-skill="true"
          />
        </b-col>
        <b-col
          md="3"
          class="filters-wrapper"
        >
          <LatestTweets :tip="skill" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import capitalize from 'capitalize';
import learnService from '@/services/learn.service';
import eventService from '@/services/event.service';
import jobService from '@/services/job.service';
import userService from '@/services/user.service';
import skillService from '@/services/skill.service';
import LatestArticles from '@/components/Learn/LatestArticles';
import UpcomingEvents from '@/components/Events/UpcomingEvents';
import SkillTags from '@/components/Skills/SkillTags';
import LatestJobsFromCity from '@/components/Job/LatestJobsFromCity';
import LatestTweets from '@/components/tips/LatestTweets';

export default {
	name: 'Skills',
	components: {
		LatestArticles,
		UpcomingEvents,
		SkillTags,
		LatestJobsFromCity,
		LatestTweets,
	},
	data() {
		return {
			skill: null,
			events: [],
			jobs: [],
			articles: [],
			users: [],
			allSkills: [],
			loading: false,
		};
	},
	created() {
		this.loading = true;
		this.skill = this.$route.params.skill;

		eventService.searchEventsBy(`skills=${this.skill}`).then((events) => {
			this.events = events;
			this.loading = false;
		});
		skillService.fetchSkills().then((skills) => {
			this.allSkills = skills.map((s) => s.name);
			this.loading = false;
		});
	},
	methods: {
		title() {
			return capitalize.words(this.skill);
		},
	},
};
</script>

<style scoped lang="scss">
.host {
	width: 100%;
}

.title {
	font-size: 1.5rem;
	margin-bottom: 20px;
	color: #114273;
}

.skills-tag {
	text-align: right;
}
.filters-wrapper {
	height: 100%;
	border-left: 1px solid #114273;
	flex-direction: column;
	display: flex;
	text-align: start;
	cursor: pointer;
}

.skills {
	margin: 20px 10px;
	text-align: left;
	width: 100%;
}
</style>
