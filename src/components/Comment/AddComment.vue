<template>
  <div>
    <div class="comment-box-container">
      <user-avatar :user="signedInUser" />
      <div class="comment-box">
        <star-rating
          v-show="showRating"
          v-model="rating"
          :star-size="25"
          :show-rating="false"
        />
        <EditableValue
          :ref="`commentBox`"
          v-model="commentText"
          :index="1"
          :is-editable="true"
          class="value"
          placeholder="Add new comment..."
          :multiline="true"
        />
      </div>
    </div>
    <div class="action-buttons">
      <button
        class="save-button"
        @click="save"
      >
        Save
      </button>
      <button @click="cancel">
        Cancel
      </button>
    </div>
  </div>
</template>
<script>
import EditableValue from '@/components/common/EditableValue';
import StarRating from 'vue-star-rating';
import UserAvatar from '@/components/common/UserAvatar';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import commentService from '@/services/comment.service';

export default {
	name: 'AddComment',
	components: { EditableValue, StarRating, UserAvatar },
	props: {
		onSave: {
			type: Function,
			required: true,
		},
		onCancel: {
			type: Function,
			required: true,
		},
		showRating: {
			type: Boolean,
			required: true,
		},
		parentId: {
			type: String,
			default: '',
		},
		commentId: {
			type: String,
			default: '',
		},
		isEdit: {
			type: Boolean,
			default: false,
		},
		allowOnlyRating: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			rating: 0,
			commentText: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	methods: {
		save() {
			if (
				(this.$refs.commentBox.editedValue == '' && !this.allowOnlyRating) ||
				(this.showRating && !this.rating)
			)
				return;

			var payload = {
				parentId: this.parentId,
				commentText: this.$refs.commentBox.editedValue,
				rating: this.rating,
				createdTime: new Date(),
			};

			if (this.commentId == '') {
				var add = commentService.addComment(payload);
			} else {
				var add = commentService.editComment(this.commentId, payload);
			}

			add
				.then((response) => {
					this.onSave(response, this.index);
				})
				.catch(() => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});

			this.reset();
		},
		cancel() {
			this.onCancel();
			this.reset();
		},
		reset() {
			this.$refs.commentBox.selectItem('');
			this.commentText = '';
			this.rating = 0;
		},
	},
};
</script>
<style lang="scss" scoped>
.action-buttons {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	button {
		margin-left: 0.5rem;
	}
}

.comment-box-container {
	display: flex;
	align-items: flex-start;
	.comment-box {
		flex: 1;
	}
}
</style>
