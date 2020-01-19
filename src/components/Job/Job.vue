<template>
  <div class="job">
    <div class="role-and-expertise">
      <a class="role">{{ role }}</a>
      <div class="expertise">
        {{ experienceLevel }}
      </div>
    </div>
    <div class="skills-required">
      <span
        v-for="(skill) in requiredSkills"
        :key="skill"
      >
        <a :href="'/jobs?q='+skill">{{ `${skill} ` }}</a>
      </span>
      <div class="btn-details">
        <Button
          label="Details"
          type="primary"
        />
      </div>
    </div>
    <div
      class="job-description"
      :class="{ fullHeight: showMore, lessHeight: !showMore }"
    >
      {{ jobDescription }}
    </div>
    <div class="arrow-container">
      <img
        v-if="!showMore"
        class="arrow"
        :src="'/images/down-arrow.svg'"
        @click="showMore = true"
      >
      <img
        v-if="showMore"
        class="arrow"
        :src="'/images/up-arrow.svg'"
        @click="showMore = false"
      >
    </div>
  </div>
</template>

<script>
import Button from "../Buttons/Button";
import jobService from "@/services/job.service";
const getExperienceLevel = level => {
  switch (level) {
    case 0:
      return "Beginner";
    case 1:
      return "Intermediate";
    case 2:
      return "Expert";
    default:
      "Beginner";
  }
};
export default {
  name: "Jobs",
  components: {
    Button
  },
  props: {
    role: {
      type: String,
      default: ""
    },
    expertise: {
      type: Number,
      default: 0
    },
    jobDescription: {
      type: String,
      default: "Job Description"
    },
    requiredSkills: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      detailsLabel: "Details",
      requiredSkillsLabel: "Required Skills",
      experienceLevel: getExperienceLevel(this.expertise),
      showMore: false
    };
  }
};
</script>

<style scoped lang="scss">
.job {
  width: 90%;
  border-bottom: dotted 1px #aada20;
  padding: 10px;
}
.job .role-and-expertise {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}
.expertise {
  font-size: 0.65rem;
}
.job .skills-required {
  text-align: left;
  padding: 5px 0;
  font-size: 0.65rem;
}
.job-description {
  font-size: 0.8rem;
  text-align: start;
}
.btn-details {
  width: 100px;
  height: 40px;
  float: right;
}
.lessHeight {
  min-height: 50px;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.fullHeight {
  min-height: 50px;
  height: auto;
}

.arrow {
  width: 15px;
  display: flex;
  cursor: pointer;
  color: #aada20;
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
