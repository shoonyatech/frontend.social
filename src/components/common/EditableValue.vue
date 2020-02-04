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
        v-for="(item, index) in filteredList()"
        :key="index"
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
    target="_blank"
  >{{ editedValue }}</a></span><span v-else>{{ editedValue }}</span></span>
</template>

<script>
export default {
  components: {},
  props: {
    multiline: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: -1
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    autoSelect: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      editedValue: this.value
    };
  },
  methods: {
    onChange: function(e) {
      if (this.index === -1) {
        this.$emit("change", e.target.value);
      } else {
        this.$emit("change", { val: e.target.value, index: this.index });
      }
    },
    filteredList() {
      if (this.autoSelect && this.editedValue) {
        const lowercaseValue = this.editedValue.toLowerCase();
        return this.autoSelect.filter(
          a => a.toLowerCase().indexOf(this.editedValue) > -1
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
    }
  }
};
</script>

<style scoped lang="scss">
.readonly-value {
  border-bottom: 1px solid #aada20;
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
  border: 3px solid #aada20;
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
  border-bottom: dotted 1px #aada18;
  cursor: pointer;

  &:hover {
    background-color: #aada186c;
  }
}

.input-area {
  flex-direction: column;
}
</style>
