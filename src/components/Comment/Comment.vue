<template>
  <div class="comment-container">
    <div v-show="!isEdit">
      <div class="comment-by">
        {{ comment.createdBy.userName }}
        {{ comment.createdTime | moment("timezone",new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1], "DD MMM YYYY HH:mm") }}
        <img
          :src="`/images/delete.svg`"
          class="icon-button float-right"
          @click="deleteComment()"
        >
        <!-- <img
          :src="`/images/edit.svg`"
          class="icon-button edit float-right"
          title="Edit"
          @click="editComment(comment._id, comment.comment, toolId, index)"
        />-->
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
    </div>
    <CommentReply
      v-for="(reply, index) in comment.replies"
      v-show="allowReply"
      :key="reply._id"
      :index="index"
      :comment="reply"
    />
    <add-comment-reply
      v-show="isAddReply"
      ref="addreply"
      :on-save="addReply"
      :on-cancel="toggleAddComment"
      :show-rating="false"
      :parent-id="comment._id"
      class="mt-1"
    />
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import CommentReply from "@/components/Comment/CommentReply";
import AddCommentReply from "@/components/Comment/AddCommentReply";
import commentService from "@/services/comment.service";
import eventBus from "@/utilities/eventBus";

export default {
  name: "Comment",
  components: { StarRating, CommentReply, AddCommentReply },
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
    isAddReply: {
      type: Boolean,
      default: false
    },
    saveComment: {
      type: Function
    },
    commentId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isEdit: false
    };
  },
  created() {},
  methods: {
    addReply(reply) {
      reply.createdBy = this.comment.createdBy.username;
      this.comment.replies.push(reply);
      
      var add = commentService.editComment(this.commentId, this.comment);

      add
        .then(response => {
          //this.toggleAddComment();
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    deleteComment() {
      commentService
        .deleteComment(this.commentId)
        .then(response => {
          this.onDelete(this.index);
          eventBus.$emit("show-toast", {
            body: messages.comment.commentDeleteSuccess,
            title: messages.generic.success
          });
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    editComment() {
      this.isEdit = true;
    },
    toggleAddComment() {
      this.isAddReply = !this.isAddReply;
    },
    toggleEdit() {
      this.isEdit = !this.isEdit;
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
