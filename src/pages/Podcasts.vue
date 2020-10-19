<template>
	<div class="events">
		<Loader v-show="loading" />
		<b-container>
			<b-row>
				<b-col md="9">
					<h1>Podcasts</h1>
					<div
						v-infinite-scroll="loadPodcasts"
						infinite-scroll-disabled="isDisableInfiniteScroll"
						infinite-scroll-distance="limit"
					>
						<div v-if="podcasts.length">
							<b-row>
								<b-col v-for="(podcast, index) in podcasts" :key="index" md="4">
									<div class="podcast-card-container">
										<podcast-card :podcast="podcast" class="podcast-card" />
									</div>
								</b-col>
							</b-row>
						</div>
						<div v-else>No podcasts found!</div>
					</div>
				</b-col>

				<b-col md="3">
					<div class="filters-wrapper">
						<Filters
							:on-search-params-change="onSearchParamsChange"
							:skills="skills"
							:job-types="jobTypes"
							:expertise-level="expertiseLevel"
							:hide-city="true"
						/>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import Filters from '@/components/Filters/Filters';
import podcastService from '@/services/podcast.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
import PodcastCard from '@/components/Podcast/PodcastCard.vue';

export default {
	name: 'Podcasts',
	components: {
		Filters,
		PodcastCard,
	},
	props: {
		infiniteScroll: {
			type: Boolean,
			default: false,
		},
		limit: {
			type: Number,
			default: 25,
		},
	},
	data() {
		return {
			podcasts: [],
			skills: [],
			expertiseLevel: [],
			jobTypes: [],
			loading: false,
			page: 1,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		isDisableInfiniteScroll() {
			return !this.infiniteScroll || this.busy;
		},
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadPodcasts('');
		}
	},
	methods: {
		onSearchParamsChange(param = '') {
			this.loading = true;
			this.loadPodcasts(param);
		},
		loadPodcasts(param, action) {
			switch (action) {
				case 'previous':
					action = -1;
					break;
				case 'next':
					action = 1;
					break;
				default:
					action = 0;
					break;
			}
			this.busy = false;
			this.limit = this.limit || 25;
			this.page = action + this.page || 1;

			
			podcastService.getPodcasts(param, this.limit, this.page).then((res) => {
				var podcasts = res.results;
				if (!this.infiniteScroll) {
					this.podcasts = podcasts;
				} else {
					this.podcasts = this.podcasts.concat(podcasts);
					if (podcasts.length > 0) {
						++this.page;
					}
				}
				this.busy = true;
				this.loading = false;
            });
            
		},
	},
};
</script>

<style scoped lang="scss">
.host {
	width: 100%;
}

.events {
	text-align: left;
	width: 100%;
}

.courtesy {
	font-size: 0.75rem;
	text-align: right;
}

.filters-wrapper {
	height: 100%;
	border-left: 1px solid #114273;
	flex-direction: column;
	display: flex;
	text-align: start;
	padding: 10px;
	cursor: pointer;
}

.podcast-card {
	margin: 0.5rem;
	display: flex;
	flex-direction: column;
	text-align: center;
	width: 100%;
}
</style>
