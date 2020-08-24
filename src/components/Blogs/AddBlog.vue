<template>
  <div>
    <KeyValue
      label="Blog URL"
      :is-editable="true"
      @change="onUrlChange"
    />
    <KeyValue
      label="Blog Title"
      :is-editable="true"
      @change="onTitleChange"
    />
    <KeyValue
      label="Author"
      :is-editable="true"
      @change="onAuthorChange"
    />
    <KeyValue
      label="Description"
      placeholder="Optional"
      :is-editable="true"
      :multiline="true"
      @change="onDescriptionChange"
    />

    <b-row class="row">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Type</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <span class="radio">
          <input
            v-model="blog.type"
            class="radio-input"
            type="radio"
            value="talk"
            name="type"
          >
          <span class="radio-label"> Talk</span>
        </span>
        <span class="radio">
          <input
            v-model="blog.type"
            class="radio-input"
            type="radio"
            value="tutorial"
            name="type"
          >
          <span class="radio-label"> Tutorial</span>
        </span>
        <span class="radio">
          <input
            v-model="blog.type"
            class="radio-input"
            type="radio"
            value="casestudy"
            name="type"
          >
          <span class="radio-label"> Case Study</span>
        </span>
        <span class="radio">
          <input
            v-model="blog.type"
            class="radio-input"
            type="radio"
            value="announcement"
            name="type"
          >
          <span class="radio-label"> Announcement</span>
        </span>
      </b-col>
    </b-row>
    <key-multi-value
      label="Technologies"
      :is-editable="true"
      :auto-select="skillsLookup"
      :values="blog.relatedSkills"
      @change="onSkillsChange"
    />

    <key-multi-value
      label="Tags"
      :is-editable="true"
      @change="onTagsChange"
    />

    <div class="action-buttons">
      <button
        class="save-button"
        @click="save"
      >
        Save
      </button>
      <button @click="cancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import KeyValue from "@/components/common/KeyValue";
import KeyMultiValue from "@/components/common/KeyMultiValue";
import EditCity from "@/components/City/EditCity";

import blogService from "@/services/blog.service";
import skillService from "@/services/skill.service";

import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Addblog",
  components: {
    KeyValue,
    KeyMultiValue,
  },
  data() {
    return {
      blog: {
        title: null,
        author: null,
        description: "",
        markdownUrl: null,
        tags: [],
        relatedSkills: [""],
        type: null,
      },
      skillsLookup: [],
    };
  },
  async created() {
    this.skillsLookup = (await skillService.fetchSkills()).map((s) => s.name);
  },
  methods: {
    onTitleChange(e) {
      this.blog.title = e.value;
    },
    onAuthorChange(e) {
      this.blog.author = e.value;
    },
    onDescriptionChange(e) {
      this.blog.description = e.value;
    },
    onUrlChange(e) {
      this.blog.markdownUrl = e.value;
    },
    onSkillsChange: function(skills) {
      this.blog.relatedSkills = skills;
    },
    onTagsChange: function(tags) {
      this.blog.tags = tags;
    },
    close: function(val) {
      this.$emit("close", {});
    },
    save() {
      if (!this.blog.title) {
        alert("Please specify blog title");
        return;
      } else if (!this.blog.author) {
        alert("Please specify author");
        return;
      } else if (!this.blog.markdownUrl) {
        alert("Please specify URL");
        return;
      }

      blogService
        .addBlog(this.blog)
        .then(() => {
          eventBus.$emit("show-toast", {
            body: messages.blog.blogAddSuccess,
            title: messages.generic.success,
          });

          this.close();
        })
        .catch((e) => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR,
          });
        });
    },
    cancel() {
      this.close();
    },
  },
};
</script>

<style scoped lang="scss">
.blog-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  height: 80px;
  position: relative;
  border-bottom: dotted 1px #114273;
  padding-bottom: 10px;
  margin-right: 20px;
}

.blog-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.blog-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.blog-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.links {
  position: absolute;
  right: 10px;
  top: 20px;
}

.icon-links {
  display: flex;
  flex-direction: row;
}

.blog-row {
  display: flex;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.label {
  color: #114273;
  width: 7rem;
  min-width: 7rem;
}

.radio {
  margin-right: 1rem;
}

.end-date {
  margin-left: 1.5rem;
  margin-right: 0.5rem;
  display: inline-block;
}

.action-buttons {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1rem;

  button {
    margin-left: 0.5rem;
  }
}
</style>
