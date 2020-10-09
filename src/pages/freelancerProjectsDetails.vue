<template>
  <div class="jobs-container">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <div class="job">
            <div class="role-and-expertise">
              <h1>
                {{ jobs.title }}
                <a
                  class="btn-apply"
                  :href="jobs.link"
                  target="_blank"
                >
                  <Button label="Apply for this work" />
                </a>
              </h1>
            </div>
            <div class="skills-required">
              <SkillTags :skills="jobs.relatedSkills" />

              <div class="expertise capsule remote">
                {{ jobs.jobType }}
              </div>
              <div class="expertise capsule">
                {{ jobs.budgetBasis }}
              </div>
              <div class="expertise capsule duration">
                {{ jobs.budget }}
              </div>
              <div class="expertise capsule price">
                {{ jobs.workDuration }}
              </div>
            </div>
            <br>
            <div
              ref="description"
              class="job-description"
              v-html="jobs.description"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import freelancerProjectService from '@/services/freelancerProjects.service';
import Button from '@/components/Buttons/Button';
import SkillTags from '@/components/Skills/SkillTags';

export default {
	name: 'Jobs',
	components: {
		SkillTags,
		Button,
	},
	data() {
		return {
			jobs: {},
			loading: false,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	mounted() {
		this.loadFreelancer(this.$route.params.id);
	},
	methods: {
		loadFreelancer(id) {
			freelancerProjectService
				.getFreelancerProjectsById(id)
				.then((res) => {
					this.jobs = res;
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});
		},
	},
};
</script>

<style scoped lang="scss">
.job {
	width: 90%;
	padding: 10px;
	position: relative;
}
.job .role-and-expertise {
	display: flex;
	justify-content: space-between;
	padding: 5px 0;
}
.expertise {
	font-size: 0.65rem;
}
.remote {
	background: #c50606;
	color: white;
}
.duration {
	background: #114273;
	color: white;
}
.price {
	background: rgb(3, 179, 3);
	color: white;
}
.job .skills-required {
	text-align: left;
	padding: 5px 0;
	font-size: 0.65rem;
}
.job .skills-required {
	text-align: left;
	padding: 5px 0;
	font-size: 0.65rem;
}
.job-description {
	font-size: 0.8rem;
}
.location-description {
	font-size: 0.8rem;
}
.btn-apply {
	right: 0;
	position: absolute;
	z-index: 8;
}
.collapsed {
	-webkit-mask-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(rgba(0, 0, 0, 1)),
		to(rgba(0, 0, 0, 0))
	);
}

.expanded {
	max-height: unset;
}

.arrow-container {
	display: flex;
	justify-content: center;
	align-content: center;
}
@media screen and (max-width: 759px) {
	.job {
		width: 98%;
	}
}
</style>
