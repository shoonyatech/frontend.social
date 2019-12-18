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
          {{ city.name }}, {{ city.country }}
        </div>
        <div class="text-sm">
          <span
            class="left half-width inline-block"
          >{{ city.devCount }} devs</span>
          <span
            class="half-width inline-block"
          >{{ city.designersCount }} designers</span>
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
        <div class="text-xs inline-block">
          ReactFoo 2019, JSFoo 2019
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

<style scoped>
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
