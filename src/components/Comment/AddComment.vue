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
          v-model="comment"
          :index="index"
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
import EditableValue from "@/components/common/EditableValue";
import StarRating from 'vue-star-rating';
import UserAvatar from "@/components/common/UserAvatar";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";

export default {
  name: 'AddComment',
  components: {EditableValue, StarRating, UserAvatar},
  props: {
    onSave: {
      type: Function,
      required: true,
    },
    showRating: {
      type: Boolean,
      required: true,
    },
    toolId: {
      type: String,
      default: ''
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      comment: '',
      rating: 0,
      isEdit: false,
      commentId: '',
      commentIndex: ''
    }
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  methods: {
    save() {
      if (this.showRating && !this.rating) return;

      if (this.showRating) {
        var payload = {
          rating: this.rating,
          comment: this.comment,
          username: this.signedInUser.username
        }
      } else {
        var payload = {
          toolId: this.toolId,
          comment: this.$refs.commentBox.editedValue,
          username: this.signedInUser.username
        }
      }
      this.onSave(payload, this.isEdit, this.commentId, this.commentIndex);
      this.reset()
    },
    cancel() {
      this.$emit('cancel', {rating: this.rating, comment: this.comment});
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
        this.commentIndex = index
      
    }
  }
}
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
