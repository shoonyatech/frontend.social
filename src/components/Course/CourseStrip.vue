<template>
  <!-- div for searching course -->
  <router-link :to="'/course/' + course._id ">
    <div class="thumbnail">
      <div class="details">
        <div class="course-title">
          {{ course.courseName }}
        </div>
        <div class="course-description">
          {{ course.description }}
        </div>
        <div class="button">
          <Button label="Explore" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Button from "@/components/Buttons/Button";

export default {
  components: {
    Button
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

.course-title {
  font-weight: bold;
  text-align: center;
  padding: 1rem;
}

.course-description {
  font-size: 0.6rem;
  block-size: 5.5rem;
  overflow: hidden;
}

.button {
  text-align: center;
  position: inherit;
  padding: 1rem;
}
</style>
