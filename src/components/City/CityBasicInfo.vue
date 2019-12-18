<template>
  <!-- div for searching city -->
  <div class="basic-info">
    <img
      class="photo"
      :src="`/images/cities/${city.name}-${city.country}.jpg`"
    >
    <div class="details">
      <div>{{ city.name }}, {{ city.country }}</div>
      <div class="text-sm title">
        {{ city.title }}
      </div>
      <div class="text-xs tiny-details">
        <tiny-key-value
          label="React"
          value="60"
          class="half-width pr-2"
        /><tiny-key-value
          label="Web"
          value="60"
          class="half-width"
        />
      </div>
      <div class="text-xs tiny-details">
        <tiny-key-value
          label="Angular"
          value="160"
          class="half-width pr-2"
        /><tiny-key-value
          label="Android"
          value="260"
          class="half-width"
        />
      </div>
      <div class="text-xs tiny-details">
        <tiny-key-value
          label="Vue"
          value="6000"
          class="half-width pr-2"
        /><tiny-key-value
          label="iOS"
          value="1060"
          class="half-width"
        />
      </div>
    </div>
  </div>
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

<style scoped>
/* style for city basic-info */
.basic-info {
  border: solid #aada18 2px;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
  color: #2c3e50;
  text-decoration: none;
}

.basic-info .photo {
  background-color: #aada18;
  height: 5rem;
  width: 100%;
}

.details {
  padding: 0.5rem;
  text-align: left;
}

.half-width {
  width: 50%;
}

.pr-2 {
  padding-right: 10px;
}

.title {
  margin-bottom: 10px;
}
</style>
