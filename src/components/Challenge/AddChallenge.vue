<template>
  <div>
    <div class="form-container">
      <form
        id="addChallengeForm"
        @submit.prevent="processForm"
      >
        <div class="form-field">
          <div class="form-label">
            Title
          </div>
          <input
            v-model="title"
            type="text"
            required
          >
        </div>
        <div class="problemStatement form-field">
          <div class="form-label">
            Problem Statement
          </div>
          <ckeditor
            v-model="problemStatement"
            :editor="editor"
            :config="editorConfig"
            class="editor"
          />
        </div>
        <div class="form-field">
          <div class="form-label">
            Date
          </div>
          <div class="form-field date">
            <div>
              <span class="date">Start</span>
              <input
                type="date"
                class="editable-value"
                :value="startDate"
                @change="onStartDateChange"
              >
            </div>
            <div>
              <span class="date">End</span>
              <input
                type="date"
                class="editable-value"
                :value="endDate"
                @change="onEndDateChange"
              >  
            </div>
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
        <div class="form-field">
          <div class="form-label" />
          <Checkbox
            id="published"
            label="Published"
            :is-checked="published"
            :on-click="togglePublished"
          />
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
import challengeService from "@/services/challenges.service";
import moment from 'moment';
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Checkbox from "@/components/Checkbox/Checkbox";
import challengesService from "@/services/challenges.service";

export default {
  name: "AddChallenge",
  components: {
    Checkbox,
  },
  data() {
    return {
      id: null,
      title: "",
      problemStatement: "",
      tags: "",
      published: false,
      startDate: null,
      endDate: null,
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
          // The configuration of the editor.
      }
    };
  },
  async created() {
    const id = this.$route.params.id;
    if (id && id !== "new") {
      this.id = id;
      this.loading = true;
      const details = await challengesService.getChallengeById(id);
      this.title = details.title;
      this.problemStatement = details.problemStatement;
      this.tags = details.tags.join();
      this.startDate = this.getFormattedDate(this.startTime);
      this.endDate = this.getFormattedDate(this.endTime);
      this.published = details.published || false;
    }
    this.loading = false;
  },
  mounted() {
    setTimeout(() => {
      if (!this.$store.getters.isAdmin) {
        this.$router.push("/");
        return;
      }
    }, 1000);
  },
  methods: {
    processForm(event) {
      const payload = {
        title: this.title,
        problemStatement: this.problemStatement,
        tags: this.getTags(),
        startTime: this.startDate,
        endTime: this.endDate,
        published: this.published,
      };

      if (this.id) {
        challengesService.updateChallenge(this.id, payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.challenge.challengeUpdateSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.challenge.challengeUpdateFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      } else {
        challengeService.addChallenge(payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.challenge.challengeAddSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.challenge.challengeAddFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      }

    },
    getTags() {
      const tags = this.tags.split(",");
      return tags ? tags : [];
    },
    onStartDateChange(e) {
      const value = e.currentTarget.valueAsDate;
      this.startDate = value ? this.getFormattedDate(value) : null;
    },
    onEndDateChange(e) {
      const value = e.currentTarget.valueAsDate;
      this.endDate = value ? this.getFormattedDate(value) : null;
    },
    getFormattedDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    close() {
      this.$router.back();
    },
    togglePublished() {
      this.published = !this.published;
    }
  }
};
</script>

<style lang="scss">
.form-container {
  h1 span {
    padding-left: 10px;
  }
  display: flex;
  justify-content: center;
  #addChallengeForm {
    width: 83%;

  .ck-editor {
    width: 100%;
  }

    @media screen and (max-width: 1024px) {
      width: 100%;
      padding: 10px;
    }
    .form-field {
      display: flex;
      margin-bottom: 10px;

      .form-field.date {
        display: flex;
        flex-direction: column;
        span {
          display: inline-block;
          width: 100px;
        }
      }
      
      
      textarea,
      input[type="text"] {
        flex: 1;
        border: 3px solid var(--fs-secondary-color);
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
      color: #114273;
      min-width: 7rem;
    }
  }
}

@media screen and (min-width: 320px) and (max-width: 760px) {
  .form-field {
    flex-direction: column;
    .form-label {
      color: #114273;
      min-width: 7rem;
    }
  }
  .multiple-selection {
    justify-content: space-between;
  }
}


</style>
