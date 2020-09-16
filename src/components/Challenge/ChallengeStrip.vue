<template>
  <div class="challenge">
    <div class="challenge-title">
      <a @click="onClick">
        {{ challenge.title }}
      </a>
      <div class="info-section">
        <span
          v-if="challenge.published"
          class="capsule"
        >Vote the winner</span>
        <span
          v-else
          class="capsule"
        >Active</span>
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="editChallenge"
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
          @click.prevent="deleteChallenge"
        >
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
            alt="delete"
          >
        </span>
      </div>
    </div>
    <div>
      <span
        v-if="challenge.startTime"
        class="sub-text"
      >
        {{ challenge.startTime | moment('DD MMM YYYY') }}
      </span>
      <span v-if="challenge.endTime">-</span>
      <span
        v-if="challenge.endTime"
        class="sub-text"
      >
        {{ challenge.endTime | moment('DD MMM YYYY') }}
      </span>
    </div>
    <div class="tags sub-text">
      <SkillTags
        v-if="challenge.tags"
        :skills="challenge.tags"
      />
    </div>
    <div
      ref="description"
      class="challenge-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow,
      }"
      v-html="challenge.problemStatement"
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

export default {
	name: 'ChallengeStrip',
	components: {
		Arrow,
		SkillTags,
	},
	props: {
		challenge: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			isExpanded: false,
			isOverflow: false,
			showArrow: false,
		};
	},
	computed: {
		canModify() {
			return this.$store.getters.isAdmin;
		},
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
		toggleArrow() {
			this.isExpanded = !this.isExpanded;
			this.isOverflow = !this.isOverflow;
		},
		onClick() {
			this.$router.push(`/challenge/${this.challenge._id}`);
		},
		deleteChallenge() {
			this.$emit('delete', this.challenge._id);
		},
		editChallenge() {
			this.$router.push(`/challenge/form/${this.challenge._id}`);
		},
	},
};
</script>

<style scoped lang="scss">
.challenge {
	border-bottom: dotted 1px #114273;
	padding: 10px;
	position: relative;
}

.challenge-description {
	font-size: 0.8rem;
	text-align: start;
	max-height: 100px;
	overflow: hidden;
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
.challenge-title {
	display: flex;
	justify-content: space-between;
}
.capsule {
	font-size: 0.65rem;
}
.info-section {
	display: flex;
	align-items: center;
}
</style>
