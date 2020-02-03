<template>
  <div class="job">
    <div class="role-and-expertise">
      <a class="role">{{ role }}</a>
      <div class="expertise capsule">
        {{ experienceLevel }}
      </div>
    </div>
    <div class="skills-required">
      <span
        v-for="skill in requiredSkills"
        :key="skill"
      >
        <a :href="'/jobs?q=' + skill">{{ `${skill} ` }}</a>
      </span>
      <div class="btn-apply">
        <Button
          label="Apply"
          type="primary"
        />
      </div>
    </div>
    <div
      ref="description"
      class="job-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow
      }"
    >
      {{ jobDescription }}
    </div>
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
import Button from "../Buttons/Button";
import jobService from "@/services/job.service";
import Arrow from "../Arrow/Arrow";
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
    Button,
    Arrow
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
      isExpanded: false,
      isOverflow: false,
      showArrow: false
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
    toggleArrow() {
      this.isExpanded = !this.isExpanded;
      this.isOverflow = !this.isOverflow;
    }
  }
};
</script>

<style scoped lang="scss">
.job {
  width: 90%;
  border-bottom: dotted 1px #aada20;
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
.job .skills-required {
  text-align: left;
  padding: 5px 0;
  font-size: 0.65rem;
}
.job-description {
  font-size: 0.8rem;
  text-align: start;
  max-height: 70px;
  overflow: hidden;
}
.btn-apply {
  width: 100px;
  height: 40px;
  bottom: 10px;
  right: 0;
  position: absolute;
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
