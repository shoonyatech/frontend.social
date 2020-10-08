<template>
  <div class="layout">
    <div class="freelancer-strip">
      <b-row>
        <b-col md="12">
          <span
            v-if="canModify"
            class="freelancer-action"
            @click.prevent="editFreelancer(freelancer)"
          >
            <img
              :src="`/images/edit.svg`"
              class="icon-button"
              alt="edit"
            >
          </span>
          <span
            v-if="canModify"
            class="freelancer-action"
            @click.prevent="deleteFreelancer(freelancer)"
          >
            <a target="_blank">
              <button v-if="canModify">Delete</button>
            </a>
          </span>

          <a>
            <span
              class="freelancer-title"
            ><router-link :to="'../job/freelancer/' + freelancer.username">
              {{ freelancer.username }}
            </router-link></span>
            <span class="freelancer-type capsule">{{
              freelancer.category == 'dev' ? 'Developer' : 'Designer'
            }}</span>
          </a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <a>{{ profileData.city }},{{ profileData.country }}</a>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="8">
          <SkillTags
            v-if="freelancer.relatedSkills"
            :skills="freelancer.relatedSkills"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="10">
          <div
            ref="description"
            class="freelancer-description"
            v-html="freelancer.aboutMe"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import SkillTags from '@/components/Skills/SkillTags';

export default {
	components: {
		SkillTags,
	},
	props: {
		freelancer: {
			type: Object,
			default: () => {},
		},
		canModify: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			profileData: {},
			skills: [],
		};
	},
	created() {
		userService
			.getUserProfile(this.freelancer.username)
			.then((user) => {
				this.profileData = user;
				this.skills = this.freelancer.relatedSkills.map((s) => s.name);
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
	methods: {
		deleteFreelancer(freelancer) {
			if (confirm('Do you really want to delete?')) {
				this.$emit('delete', freelancer);
			}
		},
		editFreelancer(freelancer) {
			this.$emit('edit', freelancer);
		},
	},
};
</script>

<style scoped lang="scss">
.freelancer-action {
	float: right;
}
.layout {
	display: flex;
	flex-direction: columns;
	border-bottom: dotted 1px #114273;
}

.freelancer-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	position: relative;
	padding-bottom: 10px;
	margin-right: 20px;
}

.freelancer-type {
	font-size: 0.65rem;
	float: right;
}
.icon-links {
	display: flex;
	flex-direction: row-reverse;
}

.freelancer-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}

.freelancer-title {
	cursor: pointer;
}
</style>
