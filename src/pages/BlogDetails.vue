<template>
  <div class="host">
    <b-container>
      <b-row class="description">
        <b-col>
          <h1>Blog Name</h1>
          <vue-markdown :source="blogData" />
        </b-col>
      </b-row>

      <b-row v-if="!hideComments">
        <b-col md="1" />
        <b-col md="10">
          <add-comment
            ref="addcomment"
            :comment-id="commentId"
            :on-save="saveComment"
            :on-cancel="cancelComment"
            :show-rating="showRating"
            :parent-id="blog._id"
            class="mt-1"
          />
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
        <b-col md="2" />
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Comment from "@/components/Comment/Comment";
import AddComment from "@/components/Comment/AddComment";
import commentService from "@/services/comment.service";
// import blogService from "@/services/blog.service";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
import VueMarkdown from "vue-markdown";
export default {
  name: "BlogDetails",
  components: {
    Comment,
    AddComment,
    VueMarkdown
  },
  props: {},
  data() {
    return {
      blog: {},
      hideComments: true,
      showRating: true,
      allowReply: true,
      commentId: "",
      comments: [],
      blogData: ""
    };
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    },
    items() {
      return [
        {
          text: "Blog",
          active: true
        }
      ];
    }
  },
  mounted() {
    this.loadBlog(this.$route.params.blogid);
  },
  created() {},
  beforeDestroy() {
    clearInterval(this.timer);
  },

  methods: {
    loadBlog(blogId) {
      this.blogData = `


## **A Good Choice for Anyone Familiar with Word**

Microsoft Word is the de facto productivity software for millions of users. Writage helps you become familiar with the no-frills utility of Markdown. It has a simple syntax, and using it every day can make you skilled at it.

I will recommend Markdown (and Writage) at the top of my voice if you have any kind of a writing job.

**Don’t forget to come back here and tell us what you feel about Markdown in general and Writage as a Markdown converter.**

Want to write Markdown from scratch? Use our [Markdown cheat sheet](https://www.makeuseof.com/tag/printable-markdown-cheat-sheet/) and [learn to make a table in Markdown](https://www.makeuseof.com/tag/create-markdown-table/)!

      `;
      //   blogService.getBlogById(blogId).then(res => {
      //     this.blog = res;
      //     this.getComments();
      //   });
    },
    getComments() {
      commentService
        .getComment(this.blog._id)
        .then(response => {
          this.comments = response; //.push(...response);
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

<style scoped lang="scss">
</style>