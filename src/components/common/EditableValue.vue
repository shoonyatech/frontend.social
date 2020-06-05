<template>
  <span
    v-if="isEditable"
    class="input-area"
  >
    <div>
      <textarea
        v-if="multiline"
        v-model="editedValue"
        class="editable-value"
        :placeholder="placeholder"
        @change="onChange"
      />
      <typeahead
        v-else-if="typeahead"
        :source="typeaheadSource"
        :query.sync="editedValue"
        @select="onChange($event)"
      >
        <input
          v-model="editedValue"
          class="editable-value"
          :placeholder="placeholder"
          @change="onChange"
        >
      </typeahead>
      <input
        v-else
        v-model="editedValue"
        class="editable-value"
        :placeholder="placeholder"
        @change="onChange"
      >
    </div>
    <div v-if="autoSelect">
      <div
        v-for="(item, i) in filteredList()"
        :key="i"
        class="auto-option"
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </span>
  <span
    v-else
    class="readonly-value"
  ><span
    v-if="isUrl()"
  ><a
    :href="editedValue"
    rel="noopener"
    target="_blank"
  >{{
    editedValue
  }}</a></span><span v-else>{{ editedValue }}</span></span>
</template>

<script>
import Typeahead from "@/components/Typeahead/Typeahead";

export default {
  components: { Typeahead },
  props: {
    multiline: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: -1,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    autoSelect: {
      type: Array,
      default: () => [],
    },
    typeahead: {
      type: Boolean,
      default: false,
    },
    typeaheadSource: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      editedValue: this.value,
    };
  },
  methods: {
    onChange: function(e) {
      const value = typeof e === "string" ? e : e.target.value;
      if (this.index === -1) {
        this.$emit("change", value);
      } else {
        this.$emit("change", { val: value, index: this.index });
      }
    },
    filteredList() {
      if (this.autoSelect && this.editedValue) {
        const lowercaseValue = this.editedValue.toLowerCase
          ? this.editedValue.toLowerCase()
          : this.editedValue;
        return this.autoSelect.filter(
          (a) => a && a.toLowerCase().indexOf(this.editedValue) > -1
        );
      }
      return [];
    },
    selectItem: function(item) {
      this.editedValue = item;
    },
    isUrl() {
      if (this.editedValue.trim) {
        const trimmedValue = this.editedValue.trim();
        return (
          trimmedValue.startsWith("http://") ||
          trimmedValue.startsWith("https://")
        );
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.readonly-value {
  border-bottom: 1px solid var(--fs-primary-color);
  flex: 1 1 auto;
  margin: 2px auto;
  min-width: 15rem;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}

.editable-value {
  border: 3px solid #114273;
  display: inline-block;
  margin: 2px auto;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}

textarea {
  min-height: 5rem;
}

.auto-option {
  border-bottom: dotted 1px #114273;
  cursor: pointer;

  &:hover {
    background-color: #1142736c;
  }
}

.input-area {
  flex-direction: column;
}
</style>
