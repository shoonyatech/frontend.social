<template>
  <div class="comment-container">
    <div class="comment-by">
      {{ comment.username }} - {{ comment.timestamp | moment("timezone", "Europe/London", "DD MMM YYYY HH:MM") }}
    </div>
    <star-rating
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
</style>
