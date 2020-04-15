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
          ref="commentBox"
          v-model="comment"
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
    }
  },
  data() {
    return {
      comment: '',
      rating: 0,
    }
  },
  computed: {
    signedInUser() {
      return this.$store.state.signedInUser;
    }
  },
  methods: {
    save() {
      if (!this.rating) return;

      this.onSave({rating: this.rating, comment: this.comment, user: this.signedInUser.userName})
      .then(() => {
        this.$emit('saved');
        this.reset();
        eventBus.$emit('show-toast', {body: messages.comment.commentAddSuccess, title: messages.generic.success});
      }).catch(e => {
        eventBus.$emit('show-toast', {body: e.message, title: messages.generic.error, type: ToastType.ERROR});
      });
    },
    cancel() {
      this.$emit('cancel', {rating: this.rating, comment: this.comment});
      this.reset();
    },
    reset() {
      this.$refs.commentBox.selectItem('');
      this.comment = '';
      this.rating = 0;
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
