<template>
  <div class="job">
    <div class="role-and-expertise">
      <router-link :to="'../freelancerProjects/' + id">
        {{ role }}
      </router-link>
      <div class="job-strip-right-section">
        <div
          v-if="jobType != ''"
          class="expertise capsule remote"
        >
          {{ jobType }}
        </div>
        <div
          v-if="budgetBasis != ''"
          class="expertise capsule"
        >
          {{ budgetBasis }}
        </div>
        <div
          v-if="budget != ''"
          class="expertise capsule duration"
        >
          {{ budget }}
        </div>
        <div
          v-if="workDuration != ''"
          class="expertise capsule price"
        >
          {{ workDuration }}
        </div>
        <div>
          <span
            v-if="canModify"
            class="event-action"
            @click.prevent="editJob(id)"
          >
            <img
              :src="`/images/edit.svg`"
              class="icon-button"
              alt="edit"
            >
          </span>
          <span
            v-if="canModify"
            class="event-action"
            @click.prevent="deleteJob(id)"
          >
            <img
              :src="`/images/delete.svg`"
              class="icon-button"
              alt="delete"
            >
          </span>
        </div>
      </div>
    </div>
    <div class="skills-required">
      <SkillTags
        v-if="requiredSkills"
        :skills="requiredSkills"
      />
    </div>

    <div
      ref="description"
      class="job-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow,
      }"
      v-html="jobDescription"
    />
    <div
      v-if="showArrow"
      class="arrow-container"
    >
      <Arrow
        :is-expanded="isExpanded"
        :on-click="toggleArrow"
      />
    </div>
  </div>
</template>

<script>
import Arrow from '../Arrow/Arrow';
import SkillTags from '@/components/Skills/SkillTags';

import UserService from '@/services/user.service';

export default {
	name: 'FreelancindProjectsStrip',
	components: {
		Arrow,
		SkillTags,
	},
	props: {
		id: {
			type: String,
			default: '',
		},
		role: {
			type: String,
			default: '',
		},
		jobType: {
			type: String,
			default: '',
		},
		budgetBasis: {
			type: String,
			default: '',
		},
		budget: {
			type: String,
			default: '',
		},
		workDuration: {
			type: String,
			default: '',
		},
		jobDescription: {
			type: String,
			default: 'Job Description',
		},
		requiredSkills: {
			type: Array,
			required: true,
		},
		canModify: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			detailsLabel: 'Details',
			requiredSkillsLabel: 'Required Skills',

			isExpanded: false,
			isOverflow: false,
			showArrow: false,
		};
	},
	mounted() {
		var element = this.$refs.description;
		if (element) {
			this.isOverflow =
				element.offsetHeight < element.scrollHeight ||
				element.offsetWidth < element.scrollWidth;
			this.showArrow = this.isOverflow;
		}
	},
	methods: {
		deleteJob(id) {
			if (confirm('Do you really want to delete?')) {
				this.$emit('delete', id);
			}
		},
		toggleArrow() {
			this.isExpanded = !this.isExpanded;
			this.isOverflow = !this.isOverflow;
		},

		editJob(id) {
			this.$router.push('/freelancerProjects/hire/' + id);
		},
	},
};
</script>

<style scoped lang="scss">
.job {
	width: 90%;
	border-bottom: dotted 1px #114273;
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
.job-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}
.location-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
}
.btn-apply {
	right: 0;
	position: absolute;
	z-index: 8;
	bottom: 10px;
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
.company {
	font-weight: bold;
}
.job-strip-right-section {
	display: flex;
	align-items: center;
}
@media screen and (max-width: 759px) {
	.job {
		width: 98%;
	}
}
</style>
