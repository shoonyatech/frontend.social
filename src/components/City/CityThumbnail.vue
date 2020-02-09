<template>
  <!-- div for searching city -->
  <router-link :to="'/city/' + city.name + '/' + city.country">
    <div class="thumbnail">
      <img
        class="photo"
        :src="`/images/cities/${city.name}-${city.country}.jpg`"
      >
      <div class="details">
        <div class="inline-block">
          <span>{{ city.name }}</span>
          <span v-if="city.oldName"> ({{ city.oldName }})</span>,
          <span>{{ city.country }}</span>
        </div>
        <div class="text-xs tiny-details">
          <tiny-key-value
            v-for="(skill, index) in city.topSkills"
            :key="index"
            :label="skill.skill"
            :value="skill.count"
            class="half-width pr-2"
          />
        </div>
        <div class="text-xs inline-block">
          <span>{{ city.latestEvent != null ? city.latestEvent.join(", ") : "" }}
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
    city: { type: Object, required: true }
  },

  methods: {}
};
</script>

<style scoped lang="scss">
/* style for city thumbnail */
.thumbnail {
  border: solid #aada18 2px;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
  color: #2c3e50;
  text-decoration: none;
}

.thumbnail .photo {
  background-color: #aada18;
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
