<template>
  <div class="challenge-container">
    <b-container>
      <b-row>
        <b-col
          md="1"
          sm="1"
          class="col-xs-1 rating-container"
        >
          <img
            :src="`/images/up.svg`"
            class="up-down-arrow cursor-pointer"
            alt="up arrow"
            @click="onUpVote"
          >
          {{ submission.upVote - submission.downVote }}
          <img
            :src="`/images/down.svg`"
            alt="down-arrow"
            class="up-down-arrow cursor-pointer"
            @click="onDownVote"
          >
        </b-col>
        <b-col
          md="11"
          sm="11"
          class="challenge-box mb-5 col-xs-9"
        >
          <div class="submitted-by">
            {{ submission.submittedBy.username }}
          </div>
          <div class="subtitle">
            <div class="mb-2">
              <pre>{{ submission.submission }}</pre>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Comment from "@/components/Comment/Comment.vue";
import eventBus from "@/utilities/eventBus";

export default {
  name: "Submission",
  components: {

  },
  props: {
    submission: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showRating: true,
    };
  },
  
  methods: {
    onUpVote() {
      this.$emit('upvote', this.submission._id)
    },
    onDownVote() {
      this.$emit('downvote', this.submission._id)
    },
  }
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
}
</style>