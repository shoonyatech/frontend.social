<template>
  <div
    class="feedback-box"
    :class="{ active: isActive }"
  >
    <div
      class="feedback-button"
      @click="isActive = !isActive"
    >
      GET IN TOUCH
    </div>
    <div class="feedback-panel">
      <b-container>
        <b-row>
          <b-col md="12">
            <input
              v-model.trim="fullname"
              placeholder="Name"
              required
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <input
              v-model.trim="email"
              type="email"
              placeholder="Email"
              required
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <textarea
              v-model.trim="feedback"
              placeholder="Feedback"
              rows="4"
              required
            />
          </b-col>
        </b-row>
        <b-row>
          <b-col md="12">
            <button
              :disabled="!email || !fullname || !feedback"
              @click="sendFeedback"
            >
              Send
            </button>
            <button
              class="cancel-button"
              @click="isActive = false"
            >
              Cancel
            </button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import feedbackService from '@/services/feedback.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'Feedback',
	components: {},
	data() {
		return {
			isActive: false,
			email: '',
			fullname: '',
			feedback: '',
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	watch: {
		signedInUser() {
			this.email = this.signedInUser ? this.signedInUser.email : '';
			this.fullname = this.signedInUser ? this.signedInUser.name : '';
		},
	},
	mounted() {
		setTimeout(() => {
			this.email = this.$store.state.signedInUser
				? this.$store.state.signedInUser.email
				: '';
			this.fullname = this.$store.state.signedInUser
				? this.$store.state.signedInUser.name
				: '';
		}, 1000);
	},
	methods: {
		async sendFeedback() {
			try {
				await feedbackService.sendFeedback({
					name: this.name,
					email: this.email,
					feedback: this.feedback,
				});
				this.isActive = false;
				this.feedback = '';
				eventBus.$emit('show-toast', {
					body: messages.feedback.success,
					title: messages.generic.success,
				});
			} catch (ex) {
				eventBus.$emit('show-toast', {
					body: messages.feedback.error,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			}
		},
	},
};
</script>

<style scoped lang="scss">
.feedback-box {
	font-size: 19px;
	font-size: 1.1875rem;
	position: fixed;
	top: 279px;
	right: -440px;
	width: 440px;
	transition: right 0.25s;
	z-index: 100;

	&.active {
		right: -20px;
	}
}

.feedback-button {
	background-color: var(--fs-secondary-color);
	width: 200px;
	transform: rotate(-90deg);
	transform-origin: left;
	color: #fff;
	padding: 4px 13px;
	cursor: pointer;
	margin-bottom: -250px;
	margin-left: -21px;
	box-shadow: 0 -2px 5px grey;
	font-size: 22px;
	display: flex;
	justify-content: center;
}

.feedback-panel {
	width: 427px;
	background: white;
	padding: 16px;
	box-shadow: 0 1px 10px grey;

	input,
	textarea {
		width: 100%;
		margin-bottom: 10px;
		font-size: 20px;
	}

	button:disabled {
		opacity: 0.5;
	}
}

.cancel-button {
	margin-left: 10px;
}
</style>
