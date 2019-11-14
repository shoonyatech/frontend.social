<template>
  <div class="host">
    <span class="label">{{ label }}</span>
    <EditableValue
      v-for="value in values"
      :key="value"
      :value="value"
      :is-editable="isEditable"
    />
    <button
      class="skills-add"
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
    }
  }
};
</script>

<style scoped>
.host {
  display: inline-block;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.label {
  color: #aada18;
  width: 150px;
  display: inline-block;
}
</style>
