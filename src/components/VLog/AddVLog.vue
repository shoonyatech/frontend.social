<template>
  <div>
    <div class="form-container">
      <form
        id="addVLogForm"
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
        <div class="description form-field">
          <div class="form-label">
            Description
          </div>
          <ckeditor
            v-model="description"
            :editor="editor"
            :config="editorConfig"
            class="editor"
          />
        </div>
        <div class="form-field">
          <div class="form-label">
            Youtube Link
          </div>
          <input
            v-model="link"
            type="text"
            required
          >
        </div>
        <div class="form-field">
          <div class="form-label">
            Segments
          </div>
          <AddVLogSegments :segments.sync="segments" />
        </div>
        <div class="action-links">
          <button
            type="submit"
            class="btn-add-vlog"
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
import vLogService from "@/services/vlog.service";
import moment from 'moment';
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AddVLogSegments from './AddVLogSegment.vue';

export default {
  name: "AddVLog",
  components: {
    AddVLogSegments
  },
  data() {
    return {
      id: null,
      title: "",
      description: "",
      link: "",
      segments: [],
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
      const details = await vLogService.getVLogById(id);
      this.title = details.title;
      this.description = details.description;
      this.link = details.link;
      this.segments = details.segments || [];
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
        description: this.description,
        link: this.link,
        segments: this.getSegments(),
      };
      if (this.id) {
        vLogService.updateVLog(this.id, payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.vLog.updateSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.vLog.updateFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      } else {
        vLogService.addVLog(payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.vLog.addSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.vLog.addFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      }
    },
    close() {
      this.$router.back();
    },
    getSegments() {
      return this.segments.filter(x => x.time && x.description);
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
  #addVLogForm {
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
    .btn-add-vlog,
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
