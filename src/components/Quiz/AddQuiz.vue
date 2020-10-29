<template>
	<!-- add quiz container -->
	<div class="add-quiz-wrapper">
		<Loader v-if="loading" />
		<div v-else class="form-container">
			<form id="addQuizForm" @submit.prevent="processForm">
				<div class="quiz-title form-field">
					<div class="form-label">Title</div>
					<input v-model="quiz.title" type="text" required />
				</div>
				<div class="relatedSkills form-field">
					<div class="form-label">Skills</div>
					<input v-model="quiz.relatedSkills" type="text" />
				</div>

				<QuizMultiValue
					label="Questions"
					:is-editable="true"
					:values="quiz.questions"
					@change="onQuestionChange"
				/>
				<div class="action-links">
					<button type="submit" class="btn-add-quiz">Save</button>
					<button @click.prevent.stop="close()">Cancel</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import quizService from '@/services/quiz.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import QuizMultiValue from '@/components/Quiz/QuizMultiValue';

import userService from '@/services/user.service';
export default {
	name: 'AddQuiz',
	components: {
		QuizMultiValue,
	},
	data() {
		return {
			quiz: {
				title: '',
				relatedSkills: '',
				moderators: '',
				questions: [''],
			},
			loading: false,

			isChecked: false,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
	},
	async created() {
		const quizId = this.$route.params.id;
		if (quizId && quizId !== 'new') {
			this.loading = true;

			const quizDetails = await quizService.getQuizById(quizId);
			this.intializeQuizDetail(quizDetails);
			if (!this.canModify(quizDetails)) {
				this.$router.push('/');
			}
		} else if (this.signedInUser) {
			this.admins = [this.signedInUser];
		}
		this.loading = false;
	},
	mounted() {
		setTimeout(() => {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
				return;
			}
		}, 1000);
	},
	methods: {
		onQuestionChange: function (questions) {
			this.quiz.questions = questions;
		},

		intializeQuizDetail(quizDetails) {
			this.quiz.title = quizDetails.title || '';
			this.quiz.relatedSkills = (quizDetails.relatedSkills || []).join(', ');
			this.quiz.questions = quizDetails.questions || [];
		},
		canModify(quizDetails) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			return (
				quizDetails.createdBy &&
				quizDetails.createdBy.username.toLowerCase() === username
			);
		},
		close(id) {
			if (id) {
				this.$router.push(`/quiz`);
			} else {
				this.$router.back();
			}
		},
		processForm(event) {
			this.quiz.moderators = this.signedInUser.username;
			const quizId = this.$route.params.id;
			if (quizId !== 'new') {
				quizService
					.updateQuiz(quizId, this.quiz)
					.then((res) => {
						eventBus.$emit('show-toast', {
							body: messages.quiz.QuizUpdateSuccess,
							title: messages.generic.success,
						});
						this.close(res.uniqueId);
					})
					.catch((e) => {
						eventBus.$emit('show-toast', {
							body: e.message,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			} else {
				quizService
					.addQuiz(this.quiz)
					.then((response) => {
						this.close(response._id);
					})
					.catch((error) => {
						eventBus.$emit('show-toast', {
							body: messages.quiz.QuizAddFailure,
							title: messages.generic.error,
							type: ToastType.ERROR,
						});
					});
			}
		},

		getRelatedSkills() {
			const relatedSkills = this.quiz.relatedSkills
				.split(',')
				.map((x) => x.trim());
			return relatedSkills ? relatedSkills : [];
		},
	},
};
</script>

<style lang="scss" scoped>
.form-container {
	h1 span {
		padding-left: 10px;
	}
	display: flex;
	justify-content: center;
	#addQuizForm {
		width: 83%;
		@media screen and (max-width: 1024px) {
			width: 100%;
			padding: 10px;
		}
		.form-field {
			display: flex;
			margin-bottom: 10px;
			.city-selection {
				flex: 1;
			}
			textarea,
			input[type='text'] {
				flex: 1;
				border: 3px solid #114273;
			}

			.multiple-selection {
				width: 100%;
				display: flex;
				align-items: center;
				padding-left: 20px;
				flex-wrap: wrap;
				input {
					flex: 0;
				}
				div {
					margin-right: 20px;
				}
			}
		}
		.link-and-submit-btn {
			display: flex;
			margin-bottom: 20px;
			.link.form-field {
				flex: 1;
				margin-bottom: 0;
				input {
					font-size: 1.2rem;
				}
			}
		}
		.btn-add-quiz,
		.btn-cancel {
			margin-right: 10px;
			min-width: 100px;
		}
		.action-links {
			justify-content: flex-end;
			padding: 5px;
			display: flex;
		}
		.form-label {
			width: 150px;
			color: #114273;
			min-width: 7rem;
		}
	}
}

@media screen and (min-width: 320px) and (max-width: 760px) {
	.form-field {
		flex-direction: column;
		.form-label {
			color: #114273;
			min-width: 7rem;
		}
	}
	.multiple-selection {
		justify-content: space-between;
	}
}

.ck-editor__editable p {
	margin: 0 !important;
}
</style>
<style lang="scss">
.add-quiz-wrapper {
	.ck-editor,
	.editor {
		width: 100%;
	}
}
</style>
