<template>
  <div class="job">
    <div class="role-and-expertise">
      <div class="role">
        {{ role }}
      </div>
      <div class="expertise">
        {{ experienceLevel }}
      </div>
    </div>
    <div class="skills-required">
      <span class="required-skills-label">{{ `${requiredSkillsLabel}:- ` }}</span>
      <span
        v-for="(skill,index) in requiredSkills"
        :key="skill"
      >{{ `${index+1}.${skill} ` }}</span>
    </div>
    <div class="job-description">
      {{ jobDescription }}
    </div>

    <div class="btn-details">
      <Button
        label="Details"
        type="primary"
      />
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
      type: Array
    }
  },
  data() {
    return {
      detailsLabel: "Details",
      requiredSkillsLabel: "Required Skills",
      experienceLevel: getExperienceLevel(this.expertise)
    };
  }
};
</script>

<style scoped lang="scss">
.job {
  width: 90%;
  border-bottom: 1px solid;
  padding: 10px;
}
.job .role-and-expertise {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-weight: bold;
}
.job .skills-required {
  text-align: left;
  padding: 5px 0;
}
.job .skills-required .required-skills-label {
  font-weight: bold;
}
.job-description {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 0;
  text-align: start;
}
.btn-details {
  width: 100px;
  height: 40px;
  float: right;
}
@media screen and (max-width: 759px) {
  .job {
    width: 98%;
  }
}
</style>
