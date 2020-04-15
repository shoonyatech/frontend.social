<template>
  <div class="comment-container">
    <div class="comment-by">
      {{ comment.username }} - {{ comment.timestamp | moment("timezone", "Europe/London", "DD MMM YYYY HH:MM") }}
      <span class="float-right cursor-pointer"><b-icon-pencil /></span>
    </div>
    <star-rating
      v-show="showRating"
      :star-size="25"
      :rating="Number(comment.rating)"
      :show-rating="false"
      :read-only="true"
    />
    <div>{{ comment.comment }}</div>
  </div>
</template>
<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'Comment',
  components: {StarRating},
  props: {
    comment: {
      type: Object,
      required: true,
    },
    showRating: {
      type: Boolean,
      required: true
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
.comment-container {
  border-left: 10px solid #aada20;
  padding: 10px;
  margin: 2px;

  .comment-by {
    font-size: 15px;
    color: gray;
  }
}
.cursor-pointer {
  cursor: pointer;
}
</style>
