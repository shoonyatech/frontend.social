<template>
  <div class="host">
    <b-container>
      <b-row class="description">
        <b-col>
          <h1>{{ blog.title }}</h1>
          <vue-markdown :source="blogData" />
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <div v-html="blog.body" />
        </b-col>
      </b-row>
      <hr>
      <b-row
        v-if="!hideComments"
        style="margin-top: 70px"
      >
        <h1>Comments</h1>
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
            v-for="(comment, index) in comments"
            :key="comment._id"
            :index="index"
            :comment-id="comment._id"
            :comment="comment"
            :show-rating="showRating"
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
import Comment from '@/components/Comment/Comment';
import AddComment from '@/components/Comment/AddComment';
import commentService from '@/services/comment.service';
import blogService from '@/services/blog.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import VueMarkdown from 'vue-markdown';
export default {
	name: 'BlogDetails',
	components: {
		Comment,
		AddComment,
		VueMarkdown,
	},
	props: {},
	data() {
		return {
			blog: {},
			hideComments: false,
			showRating: true,
			allowReply: true,
			commentId: '',
			comments: [],
			blogData: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		items() {
			return [
				{
					text: 'Blog',
					active: true,
				},
			];
		},
	},
	mounted() {
		this.loadBlog(this.$route.params.id);
	},
	created() {},
	beforeDestroy() {
		clearInterval(this.timer);
	},

	methods: {
		loadBlog(blogId) {
			blogService.getBlogById(blogId).then((res) => {
				this.blog = res;
				fetch(this.blog.markdownUrl)
					.then((response) => response.text())
					.then((response) => (this.blogData = response));

				this.getComments();
			});
		},
		getComments() {
			commentService
				.getComment(this.blog._id)
				.then((response) => {
					this.comments = response;
				})
				.catch(() => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});
		},
		saveComment(response, index) {
			if (this.commentId != '') {
				this.comments.splice(index, 1, response);
				this.commentId = '';
			} else {
				this.comments.push(response);
			}

			eventBus.$emit('show-toast', {
				body: messages.comment.commentAddSuccess,
				title: messages.generic.success,
			});
		},
		deleteComment(index) {
			console.log(index);
			this.comments.splice(index, 1);
		},
		editComment(commentId) {
			this.commentId = commentId;
		},
		cancelComment() {},
	},
};
</script>

<style scoped lang="scss"></style>
