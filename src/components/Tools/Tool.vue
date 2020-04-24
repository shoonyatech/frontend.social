<template>
  <div class="tool-container">
    <b-container>
      <b-row>
        <b-col
          md="1"
          sm="1"
          class="col-xs-1"
        >
          <img
            :src="`/images/up.svg`"
            alt
            class="up-down-arrow cursor-pointer"
            @click="onUpVote(tool, index)"
          >
          {{ tool.upRating - tool.downRating }}
          <img
            :src="`/images/down.svg`"
            alt
            class="up-down-arrow cursor-pointer"
            @click="onDownVote(tool, index)"
          >
        </b-col>
        <b-col
          md="1"
          sm="1"
          class="p-0 col-xs-1"
        >
          <img
            :src="tool.icon"
            class="w-100"
            alt
          >
        </b-col>
        <b-col
          md="9"
          sm="9"
          class="tool-box mb-5 col-xs-9"
        >
          <h2 class="caption">
            {{ tool.name }}
          </h2>
          <SkillTags
            v-if="tool.technologies"
            :skills="tool.technologies"
          />
          <div class="subtitle">
            <div class="mb-2">
              {{ tool.review }}
            </div>
          </div>
          <div class="subtitle color-gray">
            Reviews
            <add-comment
              ref="addcomment"
              :comment-id="commentId"
              :on-save="saveComment"
              :on-cancel="cancelComment"
              :show-rating="showRating"
              :parent-id="toolId"
              class="mt-1"
            />
            <b-col md="12 mb-2">
              <Comment
                v-for="(comment,index) in comments"
                :key="comment._id"
                :index="index"
                :comment-id="comment._id"
                :comment="comment"
                :show-rating="showRating"
                :allow-reply="allowReply"
                :on-delete="deleteComment"
                :on-edit="editComment"
                :on-save="saveComment"
              />
            </b-col>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Comment from "@/components/Comment/Comment.vue";
import AddComment from "@/components/Comment/AddComment.vue";
import SkillTags from "@/components/Skills/SkillTags";

import eventBus from "@/utilities/eventBus";
import commentService from "@/services/comment.service";
import eventService from "@/services/event.service";

export default {
  name: "Tool",
  components: {
    SkillTags,
    AddComment,
    Comment
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    toolId: {
      type: String,
      required: true
    },
    tool: {
      type: Object,
      required: true
    },
    onUpVote: {
      type: Function,
      required: true
    },
    onDownVote: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      showRating: true,
      allowReply: false,
      commentId: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    upRating() {
      if (this.comment.canVote === false) {
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR
        });
      } else {
        var payload = {
          name: this.comment.name,
          section: this.comment.section,
          icon: this.comment.icon,
          upRating: this.comment.upRating + 1,
          downRating: this.comment.downRating,
          review: this.comment.review,
          technologies: this.comment.technologies
        };
        toolService
          .upRate(this.comment._id, payload)
          .then(response => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(this.comment._id, 1);
            eventBus.$emit("show-toast", {
              body: messages.rate.rateAddSuccess,
              title: messages.generic.success
            });
          })
          .catch(e => {
            eventBus.$emit("show-toast", {
              body: e.message,
              title: messages.generic.error,
              type: ToastType.ERROR
            });
          });
      }
    },
    downRating(section, index) {
      if (this.comment.canVote === false) {
        return eventBus.$emit("show-toast", {
          body: messages.rate.rateAlreadyAdded,
          title: messages.generic.error,
          type: ToastType.ERROR
        });
      } else {
        var payload = {
          name: this.comment.name,
          section: this.comment.section,
          icon: this.comment.icon,
          upRating: this.comment.upRating - 1,
          downRating: this.comment.downRating,
          review: this.comment.review,
          technologies: this.comment.technologies
        };
        toolService
          .downRate(this.comment._id, payload)
          .then(response => {
            this.sections.splice(index, 1, response);
            this.addUserToRate(this.comment._id, -1);
            eventBus.$emit("show-toast", {
              body: messages.rate.rateDeleteSuccess,
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
      }
    },
    getComments() {
      commentService
        .getComment(this.toolId)
        .then(response => {
          this.comments = response;
        })
        .catch(() => {
          eventBus.$emit("show-toast", {
            body: e.message,
            title: messages.generic.error,
            type: ToastType.ERROR
          });
        });
    },
    saveComment(response, index) {
      if (this.commentId != "") {
        this.comments.splice(index, 1, response);
        this.commentId = "";
      } else {
        this.comments.push(response);
      }

      eventBus.$emit("show-toast", {
        body: messages.comment.commentAddSuccess,
        title: messages.generic.success
      });
    },
    deleteComment(index) {
      console.log(index);
      this.comments.splice(index, 1);
    },
    editComment(commentId) {
      this.commentId = commentId;
    },
    cancelComment() {}
  }
};
</script>
<style lang="scss" scoped>
.tool-box {
  border-bottom: 1px solid #114273;
}
.up-down-arrow {
  height: 25px;
  width: auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>