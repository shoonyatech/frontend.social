<template>
  <div class="host">
    <b-container>
      <b-breadcrumb :items="items" />
      <b-row v-if="course.rating">
        <b-col
          md="6"
          sm="12"
          class="course-rating"
        >
          <star-rating
            :rating="course.rating"
            :star-size="25"
            :read-only="true"
            :show-rating="false"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          md="6"
          sm="12"
        >
          <chapter-strip
            v-for="(chapter, index) in course.chapters"
            :key="index"
            :chapter="chapter"
            :course-id="course.uniqueId"
          />
        </b-col>
        <b-col
          md="6"
          sm="12"
        >
          <youtube
            ref="youtube"
            :video-id="course.introductoryVideoUrl"
            width="100%"
            height="400"
          />
        </b-col>
      </b-row>
      <b-row class="description">
        <b-col md="1" />
        <b-col
          md="10"
          sm="12"
        >
          <h1>Course Description</h1>
          <div
            ref="description"
            class="course-description"
            v-html="course.description"
          />
        </b-col>
      </b-row>
      <b-row
        v-if="course.author"
        class="description"
      >
        <b-col md="1" />
        <b-col
          md="10"
          sm="12"
        >
          <h1>About Author</h1>
          {{ course.author.name }}
          <div
            ref="description"
            class="course-author-description"
            v-html="course.author.description"
          />
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
            :parent-id="course._id"
            :allow-only-rating="true"
            class="mt-1"
          />
          <Comment
            v-for="(comment, index) in comments"
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
/** 3P dependency imports */
import StarRating from 'vue-star-rating';

/** Component dependencies */
import Comment from '@/components/Comment/Comment';
import AddComment from '@/components/Comment/AddComment';
import ChapterStrip from '@/components/Course/ChapterStrip';

/** services */
import commentService from '@/services/comment.service';
import courseService from '@/services/course.service';

/** Helpers */
import eventBus from '@/utilities/eventBus';

/** Constants */
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'CourseDetails',
	components: {
		Comment,
		AddComment,
		ChapterStrip,
		StarRating,
	},
	props: {},
	data() {
		return {
			course: {},
			hideComments: false,
			showRating: true,
			allowReply: true,
			commentId: '',
			comments: [],
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		items() {
			return [
				{
					text: 'Courses',
					to: '/learn/course',
				},
				{
					text: this.course.title,
					active: true,
				},
			];
		},
	},
	mounted() {
		this.loadCourse(this.$route.params.id);
	},
	created() {},
	beforeDestroy() {
		clearInterval(this.timer);
	},

	methods: {
		loadCourse(courseId) {
			courseService.getCoursesById(courseId).then((res) => {
				this.course = res;
				this.getComments();
			});
		},
		getComments() {
			commentService
				.getComment(this.course._id)
				.then((response) => {
					this.comments = response; //.push(...response);
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

<style scoped lang="scss">
.host {
	width: 100%;
	margin-bottom: 0.8rem;
}
.course-heading {
	color: #23bdee;
	font-size: 17px;
}
h1 {
	font-size: 0.9rem;
}
.course-description {
	font-size: 0.8rem;
}
.course-author-description {
	font-size: 0.8rem;
}
.description {
	margin-top: 10px;
	margin-bottom: 30px;
}
.course-rating {
	display: flex;
	justify-content: flex-end;
	padding-bottom: 5px;
}
</style>
