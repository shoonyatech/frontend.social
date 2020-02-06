<template>
  <div class="section-box">
    <span class="section-title">{{ title }}</span>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: {},
  props: {
    title: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.section-box {
  border: 2px solid #aada20;
  margin: 0 auto;
  text-align: left;
}

.content {
  padding: 0 15px 10px 15px;
}

.section-title {
  background: #aada20;
  color: #fff;
  border: none;
  padding: 4px 15px;
  margin-bottom: 12px;
  width: 100%;
  display: inline-block;
}
</style>
