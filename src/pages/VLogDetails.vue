<template>
  <b-container
    v-if="!failedToFindVLog"
    class="bv-example-row"
  >
    <Loader v-show="loading" />
    <b-row class="vlog-details-container">
      <b-col md="12">
        <b-row
          v-if="youtubeVideoId"
          class="youtube-container"
        >
          <b-col md="12">
            <youtube
              ref="youtube"
              :video-id="youtubeVideoId"
              width="100%"
              height="600"
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col
            md="12"
            class="vlog-title"
          >
            <span>{{ vlog.title }}</span>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            md="12"
            class="description"
          >
            <div v-html="vlog.description" />
          </b-col>
        </b-row>
        <b-row v-if="vlog.segments && vlog.segments.length">
          <b-col
            md="12"
            class="description"
          >
            <p>Questions Asked:</p>
            <p
              v-for="(segemnt, index) in vlog.segments"
              :key="index"
            >
              <a
                @click="onSegmentClick(segemnt.time)"
              >[{{ formattedTime(segemnt.time) }}]</a>
              {{ segemnt.description }}
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row class="vlog-comment">
      <b-col md="12">
        <add-comment
          ref="addcomment"
          :comment-id="commentId"
          :on-save="saveComment"
          :on-cancel="cancelComment"
          :show-rating="showRating"
          :parent-id="vlog._id"
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
    </b-row>
  </b-container>
  <h1
    v-else
    class="fail-message"
  >
    Opps! Failed to find VLog details
  </h1>
</template>
<script>
import Comment from '@/components/Comment/Comment';
import AddComment from '@/components/Comment/AddComment';
import commentService from '@/services/comment.service';

import vLogService from '@/services/vlog.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages, VLogType } from '@/constants/constants';

export default {
	name: 'VLogDetails',
	components: {
		Comment,
		AddComment,
	},
	data() {
		return {
			failedToFindVLog: false,
			vLogId: null,
			vlog: {},
			loading: true,
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
		type() {
			return this.$route.name === 'catchupDetails'
				? VLogType.CATCHUP
				: VLogType.FREELANCING;
		},
	},
	computed: {
		youtubeVideoId() {
			return this.vlog.link ? this.parseYoutubeVideoId(this.vlog.link) : null;
		},
	},
	async created() {
		this.loading = true;
		this.vLogId = this.$route.params.id;
		if (!this.vLogId) {
			this.failedToFindVLog = true;
			return;
		}
	},
	mounted() {
		this.getVLog();
	},
	methods: {
		formattedTime(time) {
			const date = new Date(0);
			date.setSeconds(time);
			return date.toISOString().substr(11, 8);
		},
		getVLog() {
			return vLogService
				.getVLogByUniqueId(this.vLogId)
				.then((vlog) => {
					this.vlog = vlog;
					this.getComments();
					this.loading = false;
				})
				.catch(() => {
					this.failedToFindVLog = true;
					this.loading = false;
				});
		},
		parseYoutubeVideoId(link) {
			try {
				const url = new URL(link);
				const urlParams = new URLSearchParams(url.search);
				return urlParams.get('v') || null;
			} catch (e) {
				return null;
			}
		},
		getComments() {
			commentService
				.getComment(this.vlog._id)
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
		onSegmentClick(time) {
			if (this.$refs.youtube) {
				this.$refs.youtube.player.seekTo(time);
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.vlog-title {
	display: flex;
	justify-content: space-between;
}

.youtube-container {
	padding: 10px 0;
}

.description {
	font-size: 0.75rem;
}

.vlog-comment {
	margin-bottom: 10px;
}
</style>
