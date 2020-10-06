<template>
  <b-container class="article-form">
    <Loader v-if="loading" />
    <div v-else>
      <b-row>
        <h1>Register as a freelancer</h1>
      </b-row>
      <KeyValue
        label="About me"
        :is-editable="true"
        :multiline="true"
        @change="onDescriptionChange"
      />
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
  </b-container>
</template>

<script>
import KeyValue from '@/components/common/KeyValue';
import freelancerService from '@/services/freelancer.service';
import skillService from '@/services/skill.service';

import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'AddFreelancer',
	components: {
		KeyValue,
	},
	data() {
		return {
			freelancer: {
				aboutMe: '',
			},
			loading: true,
		};
	},
	async created() {
		this.loading = false;
	},
	methods: {
		onDescriptionChange(e) {
			this.freelancer.aboutMe = e.value;
		},
		close: function (id) {
			if (id) {
				this.$router.push(`/job/freelancer/${id}`);
			} else {
				this.$router.back();
			}
		},
		save() {
			if (!this.freelancer.aboutMe) {
				alert('Please specify About you');
				return;
			}
			freelancerService
				.addFreelancer(this.freelancer)
				.then((resp) => {
					eventBus.$emit('show-toast', {
						body: messages.events.eventsAddSuccess,
						title: messages.generic.success,
					});
					this.close(resp._id);
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});
		},
		cancel() {
			this.close();
		},
	},
};
</script>

<style scoped lang="scss">
.article-form {
	padding: 20px 10px;
}
.article-strip {
	flex: 0 1 auto;
	font-size: 0.9rem;
	margin: 10px;
	width: 95%;
	height: 80px;
	position: relative;
	border-bottom: dotted 1px #114273;
	padding-bottom: 10px;
	margin-right: 20px;
}

.article-line {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.article-skills {
	font-size: 0.65rem;
	color: #2c3e50;
}

.article-date {
	font-size: 0.65rem;
	color: var(--fs-primary-color);
}

.links {
	position: absolute;
	right: 10px;
	top: 20px;
}

.icon-links {
	display: flex;
	flex-direction: row;
}

.article-row {
	display: flex;
	width: 100%;
	padding-left: 10px;
	text-align: left;
}

.label {
	color: #114273;
	width: 7rem;
	min-width: 7rem;
}

.radio {
	margin-right: 1rem;
}

.end-date {
	margin-right: 1.5rem;
	display: inline-block;
}

.action-buttons {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	margin-top: 1rem;

	button {
		margin-left: 0.5rem;
	}
}

.row {
	margin-bottom: 15px;
}
.articleLink {
	font-weight: bold;
}

.user-info {
	display: flex;
	width: 100%;
	align-items: center;
}

.admin-heading {
	margin-top: 25px;
}
</style>
