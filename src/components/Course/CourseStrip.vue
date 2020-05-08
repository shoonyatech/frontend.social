<template>
  <!-- div for searching course -->
  <router-link :to="'/course/' + course._id ">
    <div class="thumbnail">
      <div class="details">
        <div class="course-title">
          {{ course.courseName }}
        </div>
        <div class="course-technology">
          {{ course.technology }}
        </div>
        <div class="course-description">
          {{ course.description }}
        </div>
        <div class="button">
          <Button
            label="Explore"
            :click="onExploreClick"
          />
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

  methods: {
    onExploreClick() {
      this.$router.push("/course/" + course._id);
    }
  }
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
  padding-top: 0.8rem;
  overflow: hidden;
  white-space: nowrap;
}
.course-technology {
  font-size: 0.6rem;
  font-weight: bold;
  text-align: center;
}

.course-description {
  font-size: 0.6rem;
  block-size: 6.5rem;
  overflow: hidden;
}

.button {
  text-align: center;
  position: inherit;
  padding: 0.5rem;
}
</style>
