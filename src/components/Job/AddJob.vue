<template>
  <!-- add jobs container -->
  <div class="add-job-wrapper">
    <div class="add-job-title">
      Add Job
    </div>
    <div class="form-container">
      <form
        id="addJobForm"
        @submit.prevent="processForm"
      >
        <div class="job-title form-field">
          <div class="form-label">
            Title
          </div>
          <input
            v-model="title"
            type="text"
            required
          >
        </div>
        <div class="description form-field">
          <div class="form-label">
            Description
          </div>
          <textarea
            v-model="description"
            type="text"
            required
          />
        </div>
        <div class="skills form-field">
          <div class="form-label">
            Skills
          </div>
          <div class="multiple-selection">
            <Checkbox
              id="react"
              label="React"
              :on-click="toggleSkillSelection"
            />
            <Checkbox
              id="angular"
              label="Angular"
              :on-click="toggleSkillSelection"
            />
            <Checkbox
              id="vue"
              label="Vue"
              :on-click="toggleSkillSelection"
            />
            <Checkbox
              id="webComponents"
              label="Web Components"
              :on-click="toggleSkillSelection"
            />
          </div>
        </div>
        <div class="company form-field">
          <div class="form-label">
            Company
          </div>
          <input
            v-model="company"
            type="text"
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
            v-model="tags"
            type="text"
          >
        </div>
        <div class="link-and-submit-btn">
          <div class="link form-field">
            <div class="form-label">
              Link
            </div>
            <input
              v-model="link"
              type="text"
            >
          </div>
        </div>
        <div class="action-links">
          <button
            type="submit"
            class="btn-add-job"
          >
            Save
          </button>
          <button
            class="btn-cancel"
            @click="close"
          >
            Cancel
          </button>
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
  name: "AddJob",
  components: {
    Checkbox,
    RadioButton
  },
  data() {
    return {
      title: "",
      description: "",
      company: "",
      tags: "",
      link: "",
      selectedSkills: [],
      isFullTime: false,
      isPartTime: false,
      isPermanent: false,
      isContract: false,
      level: 0,
      skillsMap: {
        react: false,
        angular: false,
        vue: false,
        webComponents: false
      }
    };
  },
  methods: {
    close: function(val) {
      this.$emit("close", {});
    },
    processForm(event) {
      const payload = {
        title: this.title,
        description: this.description,
        skills: this.getSelectedSkills(),
        company: this.company,
        isFullTime: this.isFullTime,
        isPartTime: this.isPartTime,
        isPermanent: this.isPermanent,
        isContract: this.isContract,
        level: this.level,
        tags: this.getTags(),
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
    toggleSkillSelection(id) {
      this.skillsMap[id] = !this.skillsMap[id];
    },
    getSelectedSkills() {
      return Object.keys(this.skillsMap).filter(item => this.skillsMap[item]);
    },
    getTags() {
      const tags = this.tags.split(",");
      return tags ? tags : [];
    }
  }
};
</script>

<style lang="scss" scoped>
.add-job-title {
  text-align: center;
  font-weight: bold;
}
.form-container {
  display: flex;
  justify-content: center;
  #addJobForm {
    width: 80%;
    @media screen and (max-width: 1024px) {
      width: 100%;
      padding: 10px;
    }
    .form-field {
      display: flex;
      margin-bottom: 10px;
      input[type="text"] {
        flex: 1;
        border: 3px solid #aada18;
      }
      textarea {
        flex: 1;
        border: 3px solid #aada18;
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
    }
    .btn-add-job,
    .btn-cancel {
      border: 2px solid #aada18;
      background-color: #aada18;
      width: 150px;
      border-radius: 10px;
      padding: 5px;
      margin-right: 10px;
      button {
        border: none;
        background-color: transparent;
        appearance: none;
      }
    }
    .action-links {
      justify-content: flex-end;
      padding: 5px;
      display: flex;
    }
    .form-label {
      width: 150px;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 760px) {
  .form-field {
    flex-direction: column;
    .form-label {
      font-weight: bold;
    }
  }
  .multiple-selection {
    justify-content: space-between;
  }
}
</style>
