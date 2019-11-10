<template>
  <!-- add jobs container -->
  <div class="add-job-wrapper">
    <div class="add-job-title">
      Add Job
    </div>
    <div class="form-container">
      <form
        id="AddJobForm"
        @submit.prevent="processForm"
      >
        <div class="job-title form-field">
          <div class="form-label">
            Title
          </div>
          <input
            type="text"
            :v-model="title"
            required
          >
        </div>
        <div class="description form-field">
          <div class="form-label">
            Description
          </div>
          <input
            type="text"
            :v-model="description"
            required
          >
        </div>
        <div class="skills form-field">
          <div class="form-label">
            Skills
          </div>
          <div class="multiple-selection">
            <Checkbox
              id="react"
              label="React"
              :on-click="handleSkillSelection"
            />
            <Checkbox
              id="angular"
              label="Angular"
              :on-click="handleSkillSelection"
            />
            <Checkbox
              id="vue"
              label="Vue"
              :on-click="handleSkillSelection"
            />
            <Checkbox
              id="webComponents"
              label="Web Components"
              :on-click="handleSkillSelection"
            />
          </div>
        </div>
        <div class="company form-field">
          <div class="form-label">
            Company
          </div>
          <input
            type="text"
            :v-model="company"
            required
          >
        </div>
        <div class="job-type form-field">
          <div class="form-label">
            Job Type
          </div>
          <div class="multiple-selection">
            <Checkbox
              id="isFullTime"
              :is-checked="isFullTime"
              label="Full Time"
              :on-click="toggleCheckbox"
            />
            <Checkbox
              id="isPartTime"
              :is-checked="isPartTime"
              label="Part Time"
              :on-click="toggleCheckbox"
            />
            <Checkbox
              id="isPermanent"
              :is-checked="isPermanent"
              label="Parmanent"
              :on-click="toggleCheckbox"
            />
            <Checkbox
              id="isContract"
              :is-checked="isContract"
              label="Contract"
              :on-click="toggleCheckbox"
            />
          </div>
        </div>
        <div class="level form-field">
          <div class="form-label">
            Level
          </div>
          <div class="multiple-selection">
            <RadioButton
              id="Beginner"
              :value="0"
              name="level"
              label="Beginner"
              :on-click="setLevel"
            />
            <RadioButton
              id="Intermediate"
              :value="1"
              name="level"
              label="Intermediate"
              :on-click="setLevel"
            />
            <RadioButton
              id="Expert"
              :value="2"
              name="level"
              label="Expert"
              :on-click="setLevel"
            />
          </div>
        </div>
        <div class="tags form-field">
          <div class="form-label">
            Tags
          </div>
          <input
            type="text"
            :v-model="tags"
          >
        </div>
        <div class="link-and-submit-btn">
          <div class="link form-field">
            <div class="form-label">
              Link
            </div>
            <input
              type="text"
              :v-model="link"
            >
          </div>
          <div class="btn-add-job">
            <button type="submit">
              Add Job
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import jobService from "@/services/job.service";
import Checkbox from "@/components/Checkbox/Checkbox";
import RadioButton from "@/components/RadioButton/RadioButton";
export default {
  components: {
    Checkbox,
    RadioButton
  },
  data() {
    return {
      title: "",
      description: "",
      city: "",
      company: "",
      tags: "",
      link: "",
      selectedSkills: [],
      isFullTime: false,
      isPartTime: false,
      isPermanent: false,
      isContract: false,
      level: "0",
      skillsMap: {
        react: false,
        angular: false,
        vue: false,
        webComponents: false
      }
    };
  },
  methods: {
    processForm(event) {
      const payload = {
        title: this.title,
        description: this.description,
        skils: this.selectedSkills,
        company: this.company,
        city: this.city,
        isFullTime: this.isFullTime,
        isPartTime: this.isPartTime,
        isPermanent: this.isPermanent,
        isContract: this.isContract,
        level: this.level,
        tags: this.tags.split(","),
        link: this.link
      };

      jobService.addJob(payload);
    },
    toggleCheckbox(id) {
      this[id] = !this[id];
    },
    setLevel(level) {
      this.level = level;
    },
    handleSkillSelection(id) {
      const currentSkill = this.skillsMap[id];
      if (currentSkill !== undefined) {
        this.skillsMap[id] = !this.skillsMap[id];
      }
    },
    getSelectedSkills() {
      //code will be refactored here
      const skills = [];
      const skillsIds = Object.values(skillsMap);
      skillsIds.forEach(skill => {
        if (skillsMap[skill]) {
          skills.push(skill);
        }
      });
      return skills;
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  display: flex;
  justify-content: center;
  #AddJobForm {
    width: 80%;
  }
  .form-field {
    display: flex;
    margin-bottom: 10px;
    input[type="text"] {
      flex: 1;
      border: 2px solid #aada18;
    }
    .multiple-selection {
      width: 100%;
      display: flex;
      align-items: center;
      padding-left: 20px;
      flex-wrap: wrap;
      input {
        flex: 0;
      }
      div {
        margin-right: 20px;
      }
    }
  }
  .link-and-submit-btn {
    display: flex;
    margin-bottom: 20px;
    .link.form-field {
      flex: 1;
      margin-bottom: 0;
      input {
        font-size: 1.2rem;
      }
    }
    .btn-add-job {
      border: 2px solid #aada18;
      width: 150px;
      border-radius: 15px;
      padding: 5px;
      margin-left: 10px;
      button {
        border: none;
        background-color: transparent;
        appearance: none;
      }
    }
  }
  .form-label {
    width: 150px;
  }
}
</style>
