<template>
  <div class="host">
    <b-row>
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">{{ label }}</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <EditableValue
          v-model="value"
          :is-editable="isEditable"
          class="value"
          :placeholder="placeholder"
          :multiline="multiline"
          @change="onChange"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    multiline: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onChange: function(val) {
      this.$emit("change", { label: this.label, value: val });
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
}

.label {
  color: #aada18;
  width: 7rem;
  min-width: 7rem;
}

.value {
  flex: 1 1 auto;
}

.full-width {
}
</style>
