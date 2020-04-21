<template>
  <div class="comment-reply-container">
    <div class="comment-by">
      {{ reply.createdBy }} - {{ reply.createdTime | moment("timezone", "America/Toronto", "DD MMM YYYY HH:MM") }}
      <span
        class="float-right cursor-pointer"
      >
        <b-icon-pencil />
      </span>
    </div>
    <div>{{ reply.replyText }}</div>
  </div>
</template>
<script>
export default {
  name: "CommentReply",
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.comment-reply-container {
  border: 1px solid #aada20;
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
.reply {
  font-size: 0.7em;
  float: right;
}
</style>