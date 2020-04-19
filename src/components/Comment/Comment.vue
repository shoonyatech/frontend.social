<template>
  <div class="comment-container">
    <div class="comment-by">
      {{ comment.username }}
      <span v-show="showRating">-</span>
      {{ comment.timestamp | moment("timezone", "Europe/London", "DD MMM YYYY HH:MM") }}
      <img
        :src="`/images/delete.svg`"
        class="icon-button float-right"
        @click="deleteComment(comment._id, index)"
      >
      <img
        :src="`/images/edit.svg`"
        class="icon-button edit float-right"
        title="Edit"
        @click="editComment(comment._id, comment.comment, toolId, index)"
      >
    </div>
    <star-rating
      v-show="showRating"
      :star-size="25"
      :rating="Number(comment.rating)"
      :show-rating="false"
      :read-only="true"
    />
    <div>{{ comment.comment }}</div>
    <div
      v-show="allowReply"
      class="reply-div"
    >
      <a
        class="reply"
        @click="toggleAddComment"
      >Reply</a>
    </div>
    <Reply
      v-for="reply in comment.reply"
      v-show="allowReply"
      :key="reply._id"
      :comment="reply"
    />
    <add-comment
      v-show="addReply"
      ref="addcomment"
      :on-save="saveComment"
      :show-rating="false"
      :index="1"
      :parent-id="comment._id"
      class="mt-1"
    />
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import Reply from "@/components/Comment/Reply";
import AddComment from "@/components/Comment/AddComment";
export default {
  name: "Comment",
  components: { StarRating, Reply, AddComment },
  props: {
    comment: {
      type: Object,
      required: true
    },
    showRating: {
      type: Boolean,
      required: true
    },
    onDelete: {
      type: Function,
      required: true
    },
    toolId: {
      type: String,
      default: ""
    },
    onEdit: {
      type: Function
    },
    index: {
      type: Number
    },
    allowReply: {
      type: Boolean,
      default: false
    },
    addReply: {
      type: Boolean,
      default: false
    },
    saveComment: {
      type: Function
    }
  },
  created() {},
  methods: {
    deleteComment(commentId, index) {
      this.onDelete(commentId, this.toolId, index);
    },
    editComment(commentId, comment, toolId, index) {
      this.onEdit(commentId, comment, toolId, index);
    },
    toggleAddComment() {
      this.addReply = !this.addReply;
    }
  }
};
</script>
<style lang="scss" scoped>
.comment-container {
  border: 1px solid #aada20;
  border-left: 10px solid #aada20;
  padding: 10px;
  margin: 2px;
  margin-top: 10px;
  .comment-by {
    font-size: 15px;
    color: gray;
  }
}
.cursor-pointer {
  cursor: pointer;
}
.reply-div {
  min-height: 20px;
}
.reply {
  font-size: 0.7em;
  float: right;
}
</style>
