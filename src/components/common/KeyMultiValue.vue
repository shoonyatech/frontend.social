<template>
  <div class="host">
    <span class="label">{{ label }}</span>
    <div class="value-list">
      <EditableValue
        v-for="(value, index) in values"
        :key="index"
        :value="value"
        :is-editable="isEditable"
        class="value"
        :index="index"
        @change="onChange"
      />
    </div>
    <button
      v-if="isEditable"
      class="add"
      @click="add"
    >
      +
    </button>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    label: {
      type: String,
      default: ""
    },
    values: {
      type: Array,
      default: () => [""]
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    add: function(event) {
      this.values.push("");
    },
    onChange: function({ val, index }) {
      if (index < this.values.length) {
        this.values[index] = val;
      } else {
        this.values.push(val);
      }
      this.$emit("change", this.values);
    }
  }
};
</script>

<style scoped>
.host {
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

.value-list {
  flex: 1 1 auto;
}

.add {
  flex: 0 0 auto;
  margin: 2px 0 0 10px;
  height: 1.5rem;
}
</style>
