<template>
  <div>
    <KeyValue
      label="Tool Name"
      :is-editable="true"
      :value="tool.name"
      @change="onNameChange"
    />    
    <b-row class="row mb-2">
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">Section</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <b-form-select
          v-model="tool.section"
          size="sm"
          class="editable-value"
          :options="sections"
        />
      </b-col>
    </b-row>
    <KeyValue
      label="Description"
      placeholder="Optional"
      :is-editable="true"
      :multiline="true"
      :value="tool.review"
      @change="onReviewChange"
    />

    <key-multi-value
      label="Technologies"
      :is-editable="true"
      :auto-select="skillsLookup"
      :values="tool.technologies"
      @change="onSkillsChange"
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
import skillService from "@/services/skill.service";
import toolService from "@/services/tool.service";
import { ToastType, messages } from "@/constants/constants";
import eventBus from "@/utilities/eventBus";

export default {
  name: 'AddTool',
  components: {
    KeyValue,
    KeyMultiValue,
  },
  data() {
    return {
      tool: {
        name: '',
        section: '',
        icon: "/images/sketch.png",
        upRating: 0,
        downRating: 0,
        review: '',
        technologies: [''],
      },
      skillsLookup: [],
      sections: [
        "Design",
        "Development",
        "Debug",
        "Test",
        "Build",
        "Deploy",
        "Documentation",
      ],
    };
  },
  async created() {
    this.skillsLookup = (await skillService.fetchSkills()).map(s => s.name);
  },
  methods: {
    onNameChange(e) {
      this.tool.name = e.value;
    },
    onSectionChange(e) {
      this.tool.section = e.value;
    },
    onReviewChange(e) {
      this.tool.review = e.value;
    },
    onSkillsChange: function(skills) {
      this.tool.technologies = skills;
    },
    close: function(val) {
      this.$emit("close", {})
    },
    save() {
      if (!this.tool.name.length) {
        alert("Please specify tool name");
        return;
      } else if (!this.tool.section.length) {
        alert("Please specify tool section");
        return;
      }

      toolService.addTool(this.tool)
        .then(() => {
          eventBus.$emit('show-toast', {body: messages.tool.toolAddSuccess, title: messages.generic.success});
          this.close();
      }).catch(e => {
        eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
      });
    },
    cancel() {
      this.close();
    }
  }
}
</script>

<style scoped lang="scss">
.label {
  color: #aada18;
  width: 7rem;
  min-width: 7rem;
}

.editable-value {
  border: 3px solid #aada20;
  display: inline-block;
  margin: 2px 0;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}
.editable-value:focus {
  box-shadow: none !important;
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
