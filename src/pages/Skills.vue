<template>
  <div class="skill">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="12">
          <h1>
            <span>Technologies</span>
          </h1>
          <SkillTags
            :skills="allSkills"
            class="skill-tags"
            size="large"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <FrameworkComparison />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import skillService from "@/services/skill.service";

import SkillTags from "@/components/Skills/SkillTags";
import FrameworkComparison from "@/components/Skills/FrameworkComparison";

export default {
  name: "Skills",
  components: { SkillTags, FrameworkComparison },
  data() {
    return {
      allSkills: [],
      loading: true,
    };
  },
  created() {
    skillService.fetchSkills().then(skills => {
      this.allSkills = skills.map(s => s.name);
    });
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000);
  },
  methods: {
    title() {
      return capitalize.words(this.skill);
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
}

.skills {
  margin: 20px 10px;
  text-align: left;
  width: 100%;
}

.skill-tags {
  margin-bottom: 30px;
}
</style>
