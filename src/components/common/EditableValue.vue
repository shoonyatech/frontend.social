<template>
  <input
    v-if="isEditable"
    :value="value"
    class="editable-value"
    :placeholder="placeholder"
    @change="onChange"
  >
  <span
    v-else
    class="value"
  >{{ value }}</span>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
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
    }
  },
  methods: {
    onChange: function(e) {
      if (this.index === -1) {
        this.$emit("change", e.target.value);
      } else {
        this.$emit("change", { val: e.target.value, index: this.index });
      }
    }
  }
};
</script>

<style scoped>
.value {
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
</style>
