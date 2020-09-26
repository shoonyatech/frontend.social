<template>
  <div class="host">
    <div
      v-infinite-scroll="loads"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
    >
      <h1>
        <span>Quiz</span>
      </h1>
      <div class="quizs">
        <div v-if="quizs.length">
          <QuizStrip
            v-for="(quiz, index) in quizs"
            :key="index"
            :quiz="quiz"
          />
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
		refreshPage() {
			this.showAddQuizDialog = false;
			this.loads('refresh');
		},
		showDialog() {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
			} else {
				this.showAddQuizDialog = true;
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
