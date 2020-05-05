<template>
  <!-- div for searching course -->
  <router-link :to="'/course/' + course.name + '/' + course.country">
    <div class="thumbnail">
      <img
        class="photo"
        :src="`/images/cities/${course.name}-${course.country}.jpg`"
        alt="course"
      >
      <div class="details">
        <div class="inline-block">
          <span>{{ course.name }}</span>
          <span v-if="course.oldName"> ({{ course.oldName }})</span>,
          <span>{{ course.country }}</span>
        </div>
        <div class="text-xs tiny-details">
          <tiny-key-value
            v-for="(skill, index) in course.topSkills"
            :key="index"
            :label="skill.skill"
            :value="skill.count"
            class="half-width pr-2"
          />
        </div>
        <div class="text-xs inline-block">
          <span>{{ course.latestEvent != null ? course.latestEvent.join(", ") : "" }}
          </span>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import TinyKeyValue from "@/components/common/TinyKeyValue";

export default {
  components: {
    TinyKeyValue
  },
  props: {
    course: { type: Object, required: true }
  },

  methods: {}
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */
.thumbnail {
  border: solid #114273 2px;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
  color: #2c3e50;
  text-decoration: none;
}

.thumbnail .photo {
  background-color: #114273;
  height: 5rem;
  width: 100%;
}

.details {
  padding: 0.5rem;
  margin-top: -0.75rem;
  text-align: left;
}

.half-width {
  width: 50%;
}

.pr-2 {
  padding-right: 10px;
}
</style>
