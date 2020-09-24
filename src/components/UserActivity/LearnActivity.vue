<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Learn Page : {{ articles.length }}
          <br>
          <UserLearnActivity
            v-for="(article, index1) in articles"
            :key="index1"
            :article="article"
            :profile="article.createdBy"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserLearnActivity from '@/components/Learn/UserLearnActivity';
import learnService from '@/services/learn.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'UserActivity',
	components: { UserLearnActivity },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			articles: [],
		};
	},
	created() {
		learnService
			.getArticlesAddedOnDate(this.dateCreated)
			.then((article) => {
				this.articles = article;
			})
			.catch((e) => {
				eventBus.$emit('show-toast', {
					body: e.message,
					title: messages.generic.error,
					type: ToastType.ERROR,
				});
			});
	},
};
</script>

<style scoped lang="scss">
.text {
	color: rgb(48, 190, 238);
}
</style>
