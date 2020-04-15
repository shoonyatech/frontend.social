<template>
  <!-- add jobs container -->
  <div class="add-job-wrapper">
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
          <ckeditor
            v-model="description"
            :editor="editor"
            :config="editorConfig"
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
        <div class="city form-field">
          <div class="form-label">
            Location
          </div>
          <div class="city-selection">
            <EditCity
              :edit-mode="true"
              :city="city"
              :country="country"
              :add-city="true"
              @change="onCityChange"
            />
          </div>
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
          <button @click="close">
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
import EditCity from "@/components/City/EditCity";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  name: "AddJob",
  components: {
    Checkbox,
    RadioButton,
    EditCity
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
      },
      city: null,
      country: null,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
          // The configuration of the editor.
      }
    };
  },
  methods: {
    close: function(val) {
      this.$emit("close", {});
    },
    onCityChange(city) {
      this.city = city.name;
      this.country = city.country;
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
        link: this.link,
        city: this.city,
        country: this.country
      };

      jobService.addJob(payload).then(response => {
        eventBus.$emit('show-toast', {body: messages.job.jobAddSuccess, title: messages.generic.success});
        this.close();
      })
      .catch(error => {
        eventBus.$emit('show-toast', {body: messages.job.jobAddFailure, title: messages.generic.error, type: ToastType.ERROR});
      });
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
.form-container {
  h1 span {
    padding-left: 10px;
  }
  display: flex;
  justify-content: center;
  #addJobForm {
    width: 83%;
    @media screen and (max-width: 1024px) {
      width: 100%;
      padding: 10px;
    }
    .form-field {
      display: flex;
      margin-bottom: 10px;
      .city-selection {
        flex: 1;
      }
      textarea,
      input[type="text"] {
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
      margin-right: 10px;
      min-width: 100px;
    }
    .action-links {
      justify-content: flex-end;
      padding: 5px;
      display: flex;
    }
    .form-label {
      width: 150px;
      color: #aada18;
      min-width: 7rem;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 760px) {
  .form-field {
    flex-direction: column;
    .form-label {
      color: #aada18;
      min-width: 7rem;
    }
  }
  .multiple-selection {
    justify-content: space-between;
  }
}
.ck-editor {
  width: 80%;
}
.ck-editor__editable p {
  margin: 0 !important;
}
</style>
