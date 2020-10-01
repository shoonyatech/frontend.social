<template>
	<b-container v-if="!failedToFindEvent" class="bv-example-row">
		<Loader v-show="loading" />
		<b-row class="event-details-container">
			<b-col md="9">
				<b-row>
					<b-col md="12" class="event-title">
						<span>{{ event.title }}</span>
						<div>
							<span
								v-if="canModify"
								class="event-action"
								@click.prevent="onDeleteEvent"
							>
								<img
									:src="`/images/delete.svg`"
									class="icon-button"
									alt="delete"
								/>
							</span>
							<span
								v-if="canModify"
								class="event-action"
								@click.prevent="onEditEvent"
							>
								<img :src="`/images/edit.svg`" class="icon-button" alt="edit" />
							</span>
							<span class="event-type capsule">
								{{ getEventTypeName(event.type) }}
							</span>
							<span v-if="event.isOnline" class="event-type capsule online"
								>online</span
							>
						</div>
					</b-col>
				</b-row>
				<b-row>
					<b-col md="11">
						<div class="event-date">
							<span>
								{{ event.dateFrom | moment('DD MMM YYYY') }}
							</span>
							<span v-if="event.dateTo">-</span>
							<span v-if="event.dateTo">
								{{ event.dateTo | moment('DD MMM YYYY') }}
							</span>
							in
							<a :href="'/city/' + event.city + '/' + event.country">
								<span class="city">{{ event.city }}, {{ event.country }}</span>
							</a>
						</div>
						<SkillTags
							v-if="event.relatedSkills"
							:skills="event.relatedSkills"
						/>
					</b-col>
					<b-col md="1">
						<div class="links icon-links">
							<icon-link
								v-if="event.youtube"
								icon="/images/youtube.svg"
								:url="event.youtube"
							/>
							<icon-link
								v-if="event.twitter"
								icon="/images/twitter.svg"
								:url="event.twitter"
							/>
							<icon-link
								v-if="event.website"
								icon="/images/web.svg"
								:url="event.website"
							/>
							<icon-link
								v-if="event.onlineLink"
								icon="/images/play.svg"
								:url="event.onlineLink"
							/>
						</div>
					</b-col>
				</b-row>
				<b-row v-if="youtubeVideoId" class="youtube-container">
					<b-col md="12">
						<youtube :video-id="youtubeVideoId" width="100%" height="600" />
					</b-col>
				</b-row>
				<b-row>
					<b-col md="12">
						<div v-html="event.description" />
					</b-col>
				</b-row>

				<b-row style="margin-top: 20px">
					<h1>Video Rooms (Click to join call)</h1>
				</b-row>
				<b-row>
					<b-col md="12">
						<EventMeetings
							v-if="event._id"
							:id="event._id"
							type="EVENT"
							:is-editable="isAdmin"
							:admins="event.adminUsers || []"
						/>
					</b-col>
				</b-row>
				<b-row v-if="!hideComments" style="margin-top: 20px">
					<h1>Comments</h1>
				</b-row>
				<b-row v-if="!hideComments && signedInUser">
					<b-col md="12">
						<add-comment
							ref="addcomment"
							:comment-id="commentId"
							:on-save="saveComment"
							:on-cancel="cancelComment"
							:show-rating="showRating"
							:parent-id="event._id || eventId"
							class="mt-1"
						/>
					</b-col>
				</b-row>
				<b-row v-if="!hideComments" style="margin-bottom: 20px">
					<b-col md="12">
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
			</b-col>
			<b-col md="3">
				<OnlineUsers />
			</b-col>
		</b-row>
	</b-container>
	<h1 v-else class="fail-message">Opps! Failed to find Event details</h1>
</template>
<script>
import Comment from '@/components/Comment/Comment.vue';
import AddComment from '@/components/Comment/AddComment.vue';
import IconLink from '@/components/common/IconLink';
import SkillTags from '@/components/Skills/SkillTags';
import EventMeetings from '@/components/Events/EventMeetings.vue';
import OnlineUsers from '@/components/OnlineUsers/OnlineUsers.vue';

import commentService from '@/services/comment.service';
import eventService from '@/services/event.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import { getEventTypeName } from '@/utilities/utils';
import UserService from '@/services/user.service';
export default {
	name: 'EventDetails',
	components: {
		Comment,
		AddComment,
		SkillTags,
		IconLink,
		EventMeetings,
		OnlineUsers,
	},
	data() {
		return {
			hideComments: false,
			failedToFindEvent: false,
			eventId: null,
			event: {},
			nickName: '',
			meetingId: '',
			meetingPassword: '',
			comments: [],
			loading: true,
			showRating: false,
			allowReply: false,
			commentId: '',
			interval: null,
			activity: {
				title: '',
				pageLink: '',
				model: 'e',
				activityType: 'd',
			},
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		guestUser() {
			return this.$store.state.guestUser;
		},
		youtubeVideoId() {
			return this.event.youtube
				? this.parseYoutubeVideoId(this.event.youtube)
				: null;
		},
		isAdmin() {
			if (this.signedInUser && this.event) {
				const username = this.signedInUser.username.toLowerCase();
				const adminUsers = this.event.adminUsers || [];
				return (
					(this.event.createdBy &&
						this.event.createdBy.username === username) ||
					adminUsers.some((x) => x.username.toLowerCase() === username)
				);
			}
			return false;
		},
		canModify() {
			if (!this.signedInUser || !this.event) return false;

			const username = this.signedInUser.username.toLowerCase();
			const admins = this.event.adminUsers || [];
			return (
				(this.event.createdBy &&
					this.event.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
	},
	async created() {
		this.loading = true;
		this.eventId = this.$route.params.id;
		if (!this.eventId) {
			this.failedToFindEvent = true;
			return;
		}

		eventService
			.getEventByUniqueId(this.eventId)
			.then((event) => {
				this.event = event;
				this.loading = false;
				this.getComments();
			})
			.catch(() => {
				this.failedToFindEvent = true;
				this.loading = false;
			});

		this.interval = setInterval(() => this.getComments(), 5000);
	},
	mounted() {
		setTimeout(() => {
			if (this.signedInUser == null && this.guestUser == null) {
				this.$router.push('/signin');
				return;
			}
		}, 1000);
	},
	beforeDestroy() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	},
	methods: {
		getEventTypeName: getEventTypeName,
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
				.getComment(this.event._id)
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
		onEditEvent() {
			this.$router.push(`/event/form/${this.event._id}`);
		},
		onDeleteEvent() {
			this.loading = true;
			eventService
				.deleteEvent(this.event._id)
				.then(() => {
					this.activity.title = this.event.title;
					this.activity.pageLink = this.event.website;
					UserService.addActivities(this.activity)
						.then((resp) => {})
						.catch((err) => {
							console.log(err);
						});
					eventBus.$emit('show-toast', {
						body: messages.events.eventDeletedSuccess,
						title: messages.generic.success,
					});
					this.loading = false;
					this.$router.back();
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
					this.loading = false;
				});
		},
	},
};
</script>
<style lang="scss" scoped>
.event-title {
	display: flex;
	justify-content: space-between;
}

.event-type {
	font-size: 0.65rem;
	float: right;

	&.online {
		background: #c50606;
		color: white;
	}
}

.fail-message {
	text-align: center;
}

.youtube-container {
	padding: 10px 0;
}

.icon-links {
	display: flex;
	flex-direction: row-reverse;
}

.event-action {
	float: right;
	margin-top: -7px;
}
</style>
