<template>
  <div>
    <KeyValue
      label="Talk/Article Title"
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
    <KeyValue
      label="URL"
      :is-editable="true"
      @change="onUrlChange"
    />
    <KeyValue
      label="Courtesy"
      :is-editable="true"
      placeholder="Optional (who posted about it)"
      @change="onCourtesyChange"
    />
    <KeyValue
      label="Courtesy link"
      :is-editable="true"
      placeholder="Optional (url to their website)"
      @change="onCourtesyUrlChange"
    />

    <div class="article-row">
      <span class="label">Type</span>
      <span class="radio">
        <input
          v-model="article.type"
          class="radio-input"
          type="radio"
          value="talk"
          name="type"
        >
        <span class="radio-label"> Talk</span>
      </span>
      <span class="radio">
        <input
          v-model="article.type"
          class="radio-input"
          type="radio"
          value="tutorial"
          name="type"
        >
        <span class="radio-label"> Tutorial</span>
      </span>
      <span class="radio">
        <input
          v-model="article.type"
          class="radio-input"
          type="radio"
          value="casestudy"
          name="type"
        >
        <span class="radio-label"> Case Study</span>
      </span>
    </div>

    <div class="article-row">
      <span class="label">Medium</span>
      <span class="radio">
        <input
          v-model="article.medium"
          class="radio-input"
          type="radio"
          value="blog"
          name="medium"
        >
        <span class="radio-label"> Blog</span>
      </span>
      <span class="radio">
        <input
          v-model="article.medium"
          class="radio-input"
          type="radio"
          value="tutorial"
          name="medium"
        >
        <span class="radio-label"> Video</span>
      </span>
      <span class="radio">
        <input
          v-model="article.medium"
          class="radio-input"
          type="radio"
          value="podcast"
          name="medium"
        >
        <span class="radio-label"> Podcast</span>
      </span>
    </div>

    <key-multi-value
      label="Technologies"
      :is-editable="true"
      :auto-select="skillsLookup"
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

import learnService from "@/services/learn.service";
import skillService from "@/services/skill.service";

export default {
  name: "AddArticle",
  components: {
    KeyValue,
    KeyMultiValue
  },
  data() {
    return {
      article: {
        title: null,
        author: null,
        description: "",
        url: null,
        courtesy: "",
        courtesyUrl: "",
        tags: [],
        relatedSkills: [],
        medium: null,
        type: null
      },
      skillsLookup: []
    };
  },
  async created() {
    this.skillsLookup = (await skillService.fetchSkills()).map(s => s.name);
  },
  methods: {
    onTitleChange(e) {
      this.article.title = e.value;
    },
    onAuthorChange(e) {
      this.article.author = e.value;
    },
    onDescriptionChange(e) {
      this.article.description = e.value;
    },
    onUrlChange(e) {
      this.article.url = e.value;
    },
    onCourtesyChange(e) {
      this.article.courtesy = e.value;
    },
    onCourtesyUrlChange(e) {
      this.article.courtesyUrl = e.value;
    },
    onSkillsChange: function(skills) {
      this.article.relatedSkills = skills;
    },
    onTagsChange: function(tags) {
      this.article.tags = tags;
    },
    close: function(val) {
      this.$emit("close", {});
    },
    save() {
      if (!this.article.title.length) {
        alert("Please specify article title");
        return;
      } else if (!this.article.author) {
        alert("Please specify author");
        return;
      } else if (!this.article.url) {
        alert("Please specify URL");
        return;
      } else if (!this.article.medium) {
        alert("Please specify medium");
        return;
      }

      try {
        learnService.addArticle(this.article).then(() => {
          alert("Article added successfully!");
          this.close();
        });
      } catch (e) {
        alert(e.message);
      }
    },
    cancel() {
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.article-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  height: 80px;
  position: relative;
  border-bottom: dotted 1px #aada20;
  padding-bottom: 10px;
  margin-right: 20px;
}

.article-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.article-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.article-date {
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

.article-row {
  display: flex;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.label {
  color: #aada18;
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
