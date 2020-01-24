<template>
  <div class="skill">
    <b-container>
      <b-row>
        <b-col md="12">
          <h1>
            <span>Skills</span>
          </h1>
          <SkillTags :skills="allSkills" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import skillService from "@/services/skill.service";

import SkillTags from "@/components/Skills/SkillTags";

export default {
  name: "Skills",
  components: { SkillTags },
  data() {
    return {
      allSkills: []
    };
  },
  created() {
    skillService.fetchSkills().then(skills => {
      this.allSkills = skills.map(s => s.name);
    });
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
</style>
