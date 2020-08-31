<template>
  <div class="skill-tags">
    <div
      class="skill"
      :class="{ large: size === 'large' }"
    >
      <div v-if="!skills.length">
        <span
          v-for="(skill, index) in skills"
          :key="index"
        >
          <a
            v-if="skill[index] != ' '"
            :name="`${skill}`"
            :href="`/tech/${skill}`"
          >{{ skill }}</a><span v-if="index != skills.length - 1">, </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkillTags",
  components: {},
  props: {
    skills: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="scss">
.skill-tags {
  flex: 0 1 auto;
}

.skill {
  font-size: 0.65rem;
  color: #2c3e50;

  &.large {
    font-size: 1rem;
  }
}
</style>
