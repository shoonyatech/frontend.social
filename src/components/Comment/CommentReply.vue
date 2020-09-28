<template>
  <div class="comment-reply-container">
    <div class="comment-by">
      {{ reply.createdBy }} -
      {{
        reply.createdTime
          | moment('timezone', 'America/Toronto', 'DD MMM YYYY HH:MM')
      }}
      <span class="float-right cursor-pointer">
        <img
          v-if="signedInUser && signedInUser.username == reply.createdBy"
          :src="`/images/delete.svg`"
          class="icon-button float-right"
          alt="delete"
          @click="onDeleteReply(index)"
        >
      </span>
    </div>
    <div>{{ reply.replyText }}</div>
  </div>
</template>
<script>
export default {
	name: 'CommentReply',
	props: {
		index: {
			type: Number,
			required: true,
		},
		reply: {
			type: Object,
			required: true,
		},
		onDeleteReply: {
			type: Function,
			required: true,
		},
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	created() {},
	methods: {},
};
</script>
<style lang="scss" scoped>
.comment-reply-container {
	border: 1px solid #114273;
	padding: 10px;
	margin: 2px;

	.comment-by {
		font-size: 15px;
		color: gray;
	}
}
.cursor-pointer {
	cursor: pointer;
}
.reply {
	font-size: 0.7em;
	float: right;
}
</style>
