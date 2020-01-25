<template>
  <div class="host">
    <h1>Frameworks Comparison</h1>
    <div class="skills-comparison">
      <b-container>
        <b-row>
          <b-col
            v-for="(framework, index) in frameworks"
            :key="index"
            md="3"
          >
            <FrameworkStats :framework="framework" />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import skillService from "@/services/skill.service";

import FrameworkStats from "@/components/Skills/FrameworkStats";

export default {
  components: { FrameworkStats },
  data() {
    return {
      frameworks: []
    };
  },
  created() {
    skillService.topFrameworks().then(frameworks => {
      this.frameworks = frameworks;
    });
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}
</style>
