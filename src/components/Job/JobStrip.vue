<template>
  <div class="job">
    <div class="role-and-expertise">
      <router-link
        :to="'jobs/' + id"
      >
        {{ role }}
      </router-link>
      <div class="expertise capsule">
        {{ experienceLevel }}
      </div>
    </div>
    <div class="skills-required">
      <SkillTags
        v-if="requiredSkills"
        :skills="requiredSkills"
      />
    </div>
    <a
      class="btn-apply"
      :href="link"
    >
      <Button label="Apply" />
    </a>
    <div
      ref="description"
      class="location-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow
      }"
    >
      {{ company }} | {{ location }}
    </div>
    <div
      ref="description"
      class="job-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow
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
import Button from "../Buttons/Button";
import jobService from "@/services/job.service";
import Arrow from "../Arrow/Arrow";
import SkillTags from "@/components/Skills/SkillTags";

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
  name: "JobStrip",
  components: {
    Button,
    Arrow,
    SkillTags
  },
  props: {
    id: {
      type: String,
      default: ''
    },
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
    },
    link: {
      type: String,
      default: "#"
    },
    location: {
      type: String,
      default: "Location"
    },
    company: {
      type: String,
      default: "Company"
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
@media screen and (max-width: 759px) {
  .job {
    width: 98%;
  }
}
</style>
