<template>
  <b-container class="article-form">
    <Loader v-if="loading" />
    <div v-else>
      <b-row>
        <h1>Latest talks & articles on Frontend</h1>
      </b-row>
      <KeyValue
        label="URL"
        :is-editable="true"
        @change="onUrlChange"
      />
      <KeyValue
        label="Talk/Article Title"
        :is-editable="true"
        @change="onTitleChange"
      />
      <KeyValue
        label="Author"
        :is-editable="true"
        @change="onAuthorChange"
      />
      <KeyValue
        label="Description"
        placeholder="Optional"
        :is-editable="true"
        :multiline="true"
        @change="onDescriptionChange"
      />
      <KeyValue
        label="Courtesy"
        :is-editable="true"
        placeholder="Optional (who posted about it)"
        @change="onCourtesyChange"
      />
      <KeyValue
        label="Courtesy link"
        :is-editable="true"
        placeholder="Optional (url to their website)"
        @change="onCourtesyUrlChange"
      />

      <b-row class="row">
        <b-col
          md="3"
          sm="12"
        >
          <span class="label">Type</span>
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
          <span class="radio">
            <input
              v-model="article.type"
              class="radio-input"
              type="radio"
              value="talk"
              name="type"
            >
            <span class="radio-label"> Talk</span>
          </span>
          <span class="radio">
            <input
              v-model="article.type"
              class="radio-input"
              type="radio"
              value="tutorial"
              name="type"
            >
            <span class="radio-label"> Tutorial</span>
          </span>
          <span class="radio">
            <input
              v-model="article.type"
              class="radio-input"
              type="radio"
              value="casestudy"
              name="type"
            >
            <span class="radio-label"> Case Study</span>
          </span>
          <span class="radio">
            <input
              v-model="article.type"
              class="radio-input"
              type="radio"
              value="announcement"
              name="type"
            >
            <span class="radio-label"> Announcement</span>
          </span>
        </b-col>
      </b-row>

      <b-row class="row">
        <b-col
          md="3"
          sm="12"
        >
          <span class="label">Medium</span>
        </b-col>
        <b-col
          md="9"
          sm="12"
        >
          <span class="radio">
            <input
              v-model="article.medium"
              class="radio-input"
              type="radio"
              value="blog"
              name="medium"
            >
            <span class="radio-label"> Blog</span>
          </span>
          <span class="radio">
            <input
              v-model="article.medium"
              class="radio-input"
              type="radio"
              value="video"
              name="medium"
            >
            <span class="radio-label"> Video</span>
          </span>
          <span class="radio">
            <input
              v-model="article.medium"
              class="radio-input"
              type="radio"
              value="podcast"
              name="medium"
            >
            <span class="radio-label"> Podcast</span>
          </span>
        </b-col>
      </b-row>

      <key-multi-value
        label="Technologies"
        :is-editable="true"
        :auto-select="skillsLookup"
        @change="onSkillsChange"
      />

      <key-multi-value
        label="Tags"
        :is-editable="true"
        @change="onTagsChange"
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
import KeyMultiValue from '@/components/common/KeyMultiValue';
import EditCity from '@/components/City/EditCity';

import learnService from '@/services/learn.service';
import skillService from '@/services/skill.service';

import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';

export default {
	name: 'AddArticle',
	components: {
		KeyValue,
		KeyMultiValue,
	},
	data() {
		return {
			article: {
				_id: null,
				title: null,
				author: null,
				description: '',
				url: null,
				courtesy: '',
				courtesyUrl: '',
				tags: [],
				relatedSkills: [],
				medium: null,
				type: null,
			},
			skillsLookup: [],
			loading: true,
		};
	},
	async created() {
		this.loading = false;
		this.skillsLookup = (await skillService.fetchSkills()).map((s) => s.name);
	},
	methods: {
		onTitleChange(e) {
			this.article.title = e.value;
		},
		onAuthorChange(e) {
			this.article.author = e.value;
		},
		onDescriptionChange(e) {
			this.article.description = e.value;
		},
		onUrlChange(e) {
			this.article.url = e.value;
		},
		onCourtesyChange(e) {
			this.article.courtesy = e.value;
		},
		onCourtesyUrlChange(e) {
			this.article.courtesyUrl = e.value;
		},
		onSkillsChange: function (skills) {
			this.article.relatedSkills = skills;
		},
		onTagsChange: function (tags) {
			this.article.tags = tags;
		},
		close: function (id) {
			if (id) {
				this.$router.push(`/event/${id}`);
			} else {
				this.$router.back();
			}
		},
		save() {
			if (!this.article.title) {
				alert('Please specify article title');
				return;
			} else if (!this.article.author) {
				alert('Please specify author');
				return;
			} else if (!this.article.url) {
				alert('Please specify URL');
				return;
			} else if (!this.article.medium) {
				alert('Please specify medium');
				return;
			}
			learnService
				.addArticle(this.article)
				.then((resp) => {
					eventBus.$emit('show-toast', {
						body: messages.events.eventsAddSuccess,
						title: messages.generic.success,
					});
					this.close(resp.uniqueId);
				})
				.catch((e) => {
					eventBus.$emit('show-toast', {
						body: e.message,
						title: messages.generic.error,
						type: ToastType.ERROR,
					});
				});

			// learnService
			//   .addArticle(this.article)
			//   .then(() => {
			//     eventBus.$emit("show-toast", {
			//       body: messages.article.articleAddSuccess,
			//       title: messages.generic.success,
			//     });
			//     this.close();
			//   })
			//   .catch((e) => {
			//     eventBus.$emit("show-toast", {
			//       body: e.message,
			//       title: messages.generic.error,
			//       type: ToastType.ERROR,
			//     });
			//   });
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
