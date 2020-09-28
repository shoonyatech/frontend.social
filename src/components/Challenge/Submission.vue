<template>
  <div class="challenge-container">
    <b-container>
      <b-row>
        <b-col
          v-if="published"
          md="1"
          sm="1"
          class="col-xs-1 rating-container"
        >
          <img
            :src="`/images/up.svg`"
            class="up-down-arrow cursor-pointer"
            alt="up arrow"
            :class="{ disabled: !canUpVote }"
            @click="onUpVote"
          >
          {{ votes }}
          <img
            :src="`/images/down.svg`"
            alt="down-arrow"
            class="up-down-arrow cursor-pointer"
            :class="{ disabled: !canDownVote }"
            @click="onDownVote"
          >
        </b-col>
        <b-col
          :md="published ? 11 : 12"
          class="challenge-box mb-5 col-xs-9"
        >
          <div class="submitted-by">
            {{ submission.submittedBy.username }}

            <span
              v-if="!published"
              class="event-action"
              style="float: right"
              @click.prevent="deleteSubmission"
            >
              <img
                :src="`/images/delete.svg`"
                class="icon-button"
                alt="delete"
              >
            </span>
          </div>
          <div class="subtitle">
            <div class="mb-2">
              <pre :class="{ winner: submission._id === winnerId }">{{
								submission.submission
              }}</pre>
            </div>
          </div>
          <!-- <b-row v-if="published">
              <b-col md="11">
                <AddComment :showRating="false" :onSave="addComment" :onCancel="cancelComment"></AddComment>
              </b-col>
              <b-col>
                <Comment v-for="comment in submission.comments" :comment="comment" :showRating="false"  :key="comment.id"></Comment>
              </b-col>
          </b-row> -->
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import eventBus from '@/utilities/eventBus';
// import Comment from "@/components/Comment/Comment.vue";
// import AddComment from "@/components/Comment/AddComment.vue";

export default {
	name: 'Submission',
	components: {
		// Comment,
		// AddComment,
	},
	props: {
		submission: {
			type: Object,
			default: () => {},
		},
		published: {
			type: Boolean,
			default: false,
		},
		winnerId: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			showRating: true,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		isAuthor() {
			return (
				this.signedInUser &&
				this.signedInUser.username === this.submission.submittedBy.username
			);
		},
		canUpVote() {
			if (this.isAuthor) return false;
			return !(this.submission.votes || []).find(
				(x) => x.username === this.signedInUser.username && x.vote === 1
			);
		},
		canDownVote() {
			if (this.isAuthor) return false;
			return !(this.submission.votes || []).find(
				(x) => x.username === this.signedInUser.username && x.vote === -1
			);
		},
		votes() {
			return (this.submission.votes || []).reduce(
				(acc, val) => acc + val.vote,
				0
			);
		},
	},
	methods: {
		onUpVote() {
			this.$emit('upvote', this.submission._id);
		},
		onDownVote() {
			this.$emit('downvote', this.submission._id);
		},
		deleteSubmission() {
			this.$emit('delete', this.submission._id);
		},
		async addComment() {},
		cancelComment() {},
	},
};
</script>
<style lang="scss" scoped>
.challenge-container {
	margin: 10px 0;
}
.challenge-box {
	border-bottom: 1px solid var(--fs-secondary-color);
}
.up-down-arrow {
	height: 25px;
	width: auto;
}
.cursor-pointer {
	cursor: pointer;
}
.rating-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.submitted-by {
	font-size: 15px;
	color: gray;
}
pre {
	padding: 16px;
	overflow: auto;
	font-size: 85%;
	line-height: 1.45;
	background-color: #f6f8fa;
	border-radius: 3px;
	width: 100%;
}
pre.winner {
	border: 2px solid green;
}
.disabled {
	pointer-events: none;
	opacity: 0.5;
}
</style>
