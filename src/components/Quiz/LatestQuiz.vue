<template>
  <div class="host">
    <div
      v-infinite-scroll="loads"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
    >
      <h1>
        <span>Quiz</span>

        <button
          v-if="!showAddQuizDialog"
          @click="showDialog()"
        >
          + Add Quiz
        </button>
      </h1>
      <div
        v-if="!showAddQuizDialog"
        class="quizs"
      >
        <div v-if="quizs.length">
          <QuizStrip
            v-for="(quiz, index) in quizs"
            :key="index"
            :quiz="quiz"
            :can-modify="canModify(quiz)"
            @delete="onDeleteQuiz"
            @edit="onEditEvent"
          />
          <div class="center-content">
            <button
              class="mt-4"
              @click="showDialog()"
            >
              + Add Quiz
            </button>
          </div>
        </div>
        <div v-else>
          No quizs found!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuizStrip from '@/components/Quiz/QuizStrip';

import quizService from '@/services/quiz.service';

import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'LatestQuiz',
	components: { QuizStrip },
	props: {
		skill: {
			type: String,
			default: null,
			required: false,
		},
		limit: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			quizs: [],
			showAddQuizDialog: false,
			loading: false,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},

	methods: {
		canModify(quiz) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = quiz.adminUsers || [];
			return (
				(quiz.createdBy &&
					quiz.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		onDeleteQuiz(quiz) {
			this.loading = true;
			quizService
				.deleteQuiz(quiz._id)
				.then(() => {
					eventBus.$emit('show-toast', {
						body: messages.quiz.QuizDeletedSuccess,
						title: messages.generic.success,
					});
					this.quizs = this.quizs.filter((e) => e._id !== event._id);
					this.loading = false;
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
		onEditEvent(quiz) {
			this.$router.push(`/quiz/form/${quiz._id}`);
		},
		refreshPage() {
			this.showAddQuizDialog = false;
			this.loads('refresh');
		},
		showDialog() {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
			} else {
				this.$router.push('/quiz/form/new');
			}
		},
		loads(action) {
			if (action === 'refresh') {
				this.quizs = [];
				action = 0;
				this.page = 1;
			}
			this.busy = false;
			this.limit = this.limit || 10;
			this.page = action + this.page || this.page || 1;

			quizService
				.getLatestQuiz(this.skill, this.limit, this.page)
				.then((quizs) => {
					if (!this.infiniteScroll) {
						this.quizs = quizs.results;
						if (quizs.results === undefined) {
							this.quizs = quizs.results || [];
						}
					} else {
						this.quizs = this.quizs.concat(quizs.results);
						if (this.quizs.length > 0) {
							++this.page;
						}
					}
					this.busy = true;
				});
		},
	},
};
</script>

<style scoped lang="scss">
.host {
	width: 100%;
	margin-bottom: 2.5rem;
}

.quizs {
	margin: 20px 10px;
	text-align: left;
	width: 100%;
}

.quiz {
	margin-bottom: 40px;
}

.courtesy {
	font-size: 0.75rem;
	text-align: right;
}
</style>
