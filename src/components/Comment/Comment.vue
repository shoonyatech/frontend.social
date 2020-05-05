<template>
  <div class="comment-container">
    <div v-show="!isEdit">
      <div class="comment-by">
        {{ comment.createdBy.username }}
        <!-- {{ comment.createdAt| moment("timezone","America/Toronto", "DD MMM YYYY HH:mm") }} -->
        <img
          v-if="signedInUser && signedInUser.username==comment.createdBy.username"
          :src="`/images/delete.svg`"
          class="icon-button float-right"
          alt="delete"
          @click="deleteComment()"
        >
        <!-- <img
          v-if="signedInUser.username==comment.createdBy.username"
          :src="`/images/edit.svg`"
          class="icon-button edit float-right"
          title="Edit"
          @click="toggleEdit()"
        />-->
      </div>
      <star-rating
        v-show="showRating"
        :star-size="25"
        :rating="Number(comment.rating)"
        :show-rating="false"
        :read-only="true"
      />
      <div>{{ comment.commentText }}</div>
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
    <div v-show="isEdit && signedInUser">
      <add-comment
        ref="addcomment"
        :comment-id="commentId"
        :comment="comment.comment"
        :on-save="editComment"
        :on-cancel="toggleEdit"
        :show-rating="showRating"
        :parent-id="comment.parentId"
        :is-edit="isEdit"
        class="mt-1"
      />
    </div>
    <CommentReply
      v-for="(reply, index) in comment.replies"
      v-show="allowReply"
      :key="reply._id"
      :index="index"
      :reply="reply"
    />
    <add-comment-reply
      v-show="signedInUser && isAddReply "
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
import AddComment from "@/components/Comment/AddComment";
import AddCommentReply from "@/components/Comment/AddCommentReply";
import commentService from "@/services/comment.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: "Comment",
  components: { StarRating, CommentReply, AddComment, AddCommentReply },
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
    onSave: {
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
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
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
    editComment(comment) {
      this.toggleEdit();
      this.saveComment(comment, this.index);
      eventBus.$emit("show-toast", {
        body: messages.comment.commentAddSuccess,
        title: messages.generic.success
      });
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
  border: 1px solid #114273;
  border-left: 10px solid #114273;
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
