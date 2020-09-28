<template>
  <div>
    <div class="comment-box-container">
      <user-avatar :user="signedInUser" />
      <div class="comment-box">
        <EditableValue
          :ref="`commentBox`"
          v-model="comment"
          :index="1"
          :is-editable="true"
          class="value"
          placeholder="Add new reply..."
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
	components: { EditableValue, UserAvatar },
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
	},
	data() {
		return {
			comment: '',
			rating: 0,
			isEdit: false,
			commentIndex: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	methods: {
		save() {
			if (this.$refs.commentBox.editedValue == '') return;

			var payload = {
				replyText: this.$refs.commentBox.editedValue,
				createdTime: new Date(),
				createdBy: this.signedInUser,
			};

			this.onSave(payload);
			this.reset();
		},
		cancel() {
			this.onCancel();
			this.reset();
		},
		reset() {
			this.$refs.commentBox.selectItem('');
			this.comment = '';
			this.rating = 0;
		},
		editComment(commentId, comment, toolId, index) {
			this.$refs.commentBox.selectItem(comment);
			this.isEdit = true;
			this.commentId = commentId;
			this.commentIndex = index;
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
