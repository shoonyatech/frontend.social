<template>
  <!-- div for searching course -->
  <router-link
    :to="'/learn/course/' + course.uniqueId "
    :class="{disabled: course.isDisabled}"
  >
    <div class="thumbnail">
      <div class="details">
        <div class="course-title">
          {{ course.title }}
        </div>
        <div
          v-if="course.rating"
          class="course-rating"
        >
          <star-rating
            :rating="course.rating"
            :star-size="15"
            :read-only="true"
            :show-rating="false"
          />
        </div>
        <div class="course-technology">
          {{ course.technology }}
        </div>
        <div
          class="course-description"
          :class="{'has-rating': course.rating}"
        >
          {{ course.description }}
        </div>
        <div class="button">
          <Button
            :label="course.isDisabled ? 'Coming Soon' : 'Explore'"
            :click="onExploreClick"
          />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Button from "@/components/Buttons/Button";
import StarRating from "vue-star-rating";

export default {
  components: {
    Button,
    StarRating
  },
  props: {
    course: { type: Object, required: true }
  },

  methods: {
    onExploreClick() {
      this.$router.push("/learn/course/" + course.uniqueId);
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

.course-rating {
  display: flex;
  justify-content: center;
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
  &.has-rating {
    block-size: 5rem;
  }
}

.button {
  text-align: center;
  position: inherit;
  padding: 0.5rem;
}

.disabled {
  pointer-events: none;
}
</style>
