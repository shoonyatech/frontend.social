<template>
  <div>
    <div class="form-container">
      <form
        id="addTipsForm"
        @submit.prevent="processForm"
      >
        <div class="form-field">
          <div class="form-label">
            Twitter Link
          </div>
          <input
            v-model="twitterLink"
            type="text"
            required
          >
        </div>
        <div class="tags form-field">
          <div class="form-label">
            Tags
          </div>
          <input
            v-model="tags"
            placeholder="Add comma separated tags"
            type="text"
          >
        </div>
        <div class="action-links">
          <button
            type="submit"
            class="btn-add-tip"
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
import tipsService from "@/services/tips.service";
import moment from 'moment';
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "AddTip",
  components: {
  },
  data() {
    return {
      id: null,
      twitterLink: "",
      tags: "",
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
  },
  async created() {
    const id = this.$route.params.id;
    if (id && id !== "new") {
      this.id = id;
      this.loading = true;
      const details = await tipsService.getTipById(id);
      this.twitterLink = details.twitterLink;
      this.tags = details.tags.join();
    }
    this.loading = false;
  },
  mounted() {
    setTimeout(() => {
      if (this.signedInUser == null) {
        this.$router.push("/");
        return;
      }
    }, 1000);
  },
  methods: {
    processForm(event) {
      const payload = {
        twitterLink: this.twitterLink,
        tags: this.getTags(),
      };

      if (this.id) {
        tipsService.updateTip(this.id, payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.tip.updateSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.tip.updateFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      } else {
        tipsService.addTip(payload)
        .then(response => {
          eventBus.$emit('show-toast', {body: messages.tip.addSuccess, title: messages.generic.success});
          this.close();
        })
        .catch(error => {
          eventBus.$emit('show-toast', {body: messages.tip.addFailure, title: messages.generic.error, type: ToastType.ERROR});
        });
      }

    },
    getTags() {
      if (!this.tags.trim()) return [];

      const tags = this.tags.split(",");
      return tags ? tags.map(this.formateTag) : [];
    },
    formateTag(tag) {
      let _tag = tag.trim().replace(' ', '_');
      return _tag[0] === '#' ? _tag.slice(1) : _tag;
    },
    close() {
      this.$router.back();
    },
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
  #addTipsForm {
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
    .btn-add-tip,
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
