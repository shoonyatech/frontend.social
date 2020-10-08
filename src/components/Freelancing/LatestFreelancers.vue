<template>
	<div class="freelancers">
		<Loader v-show="loading" />
		<b-container>
			<b-row>
				<b-col md="9">
					<h1>
						<span>Freelancers</span>
						<!-- <button @click="registerFreelancer()">
              + Register as a Freelancer
            </button> -->
					</h1>
					<div>
						<div
							v-infinite-scroll="loadFreelancers"
							infinite-scroll-distance="limit"
							infinite-scroll-disabled="isDisableInfiniteScroll"
						>
							<div v-if="freelancers.length">
								<FreelancerStrip
									v-for="(freelancer, index) in freelancers"
									:key="index"
									:freelancer="freelancer"
									:can-modify="canModify(freelancer)"
									@delete="onDeleteFreelancer"
									@edit="onEditEvent"
								/>
							</div>
							<div v-else>No freelancers found!</div>
						</div>
					</div>
				</b-col>
				<b-col md="3">
					<div class="filters-wrapper">
						<FreelancingFilter
							v-if="tags.length"
							:tags="tags"
							:category="category"
							:on-search-params-change="onSearchParamsChange"
						/>
					</div>
				</b-col>
			</b-row>
		</b-container>
	</div>
</template>

<script>
import FreelancerStrip from '@/components/Freelancing/FreelancerStrip';
import FreelancingFilter from '@/components/Freelancing/FreelancingFilter';
import freelancerService from '@/services/freelancer.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages, EventPageLimit } from '@/constants/constants';
export default {
	name: 'LatestFreelancers',
	components: {
		FreelancerStrip,
		FreelancingFilter,
	},
	props: {},
	data() {
		return {
			freelancers: [],
			tags: [],
			category: [],
			loading: false,
			page: 1,
			limit: 20,
		};
	},
	computed: {
		signedInUser() {
			return this.$store.state.signedInUser;
		},
		isDisableInfiniteScroll() {
			return !this.busy;
		},
	},
	async mounted() {
		this.loading = true;
		await this.getFreelancersCategory();
		await this.getFreelancersSkills();
		this.loading = false;
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadFreelancers();
		}
	},
	methods: {
		getFreelancersSkills() {
			return freelancerService.getSkills().then((resp) => {
				this.tags = resp.sort();
			});
		},
		getFreelancersCategory() {
			return freelancerService.getCategory().then((resp) => {
				this.category = resp.sort();
			});
		},
		canModify(freelancer) {
			if (!this.signedInUser) return false;

			if (this.$store.getters.isAdmin) return true;

			const username = this.signedInUser.username.toLowerCase();
			const admins = freelancer.adminUsers || [];
			return (
				(freelancer.createdBy &&
					freelancer.createdBy.username.toLowerCase() === username) ||
				admins.some((x) => x.username.toLowerCase() === username)
			);
		},
		onEditEvent(freelancer) {
			this.$router.push(`/job/freelancer/register/${freelancer.username}`);
		},
		onDeleteFreelancer(freelancer) {
			this.loading = true;
			freelancerService
				.deletefreelancer(freelancer.username)
				.then(() => {
					eventBus.$emit('show-toast', {
						body: messages.freelancer.freelancerDeletedSuccess,
						title: messages.generic.success,
					});
					this.freelancers = this.freelancers.filter(
						(e) => e.username !== freelancer.username
					);
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
		onSearchParamsChange(param = '') {
			this.loading = true;
			this.loadFreelancers(param, true);
		},
		registerFreelancer() {
			if (this.signedInUser == null) {
				this.$router.push('/signin');
			} else {
				freelancerService
					.getFreelancerByUsername(this.$store.state.signedInUser.username)
					.then((freelancers) => {
						this.$router.push(
							`/job/freelancer/register/${freelancers.username}`
						);
					})
					.catch((err) => {
						this.$router.push('/job/freelancer/register/new');
					});
			}
		},
		loadFreelancers(param = '', filter = true) {
			let query = '';
			this.busy = false;
			this.limit = this.limit || 20;
			this.page = filter ? 1 : this.page || 1;
			freelancerService
				.getFreelancers(param, this.limit, this.page)
				.then((freelancer) => {
					if (filter) {
						this.freelancers = freelancer;
					} else this.freelancers = this.freelancers.concat(freelancer);
					if (freelancer.length > 0) {
						++this.page;
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
	margin-bottom: 2.5rem;
}

.freelancers {
	margin: 20px 10px;
	text-align: left;
	width: 100%;
}

.article {
	margin-bottom: 40px;
}

.courtesy {
	font-size: 0.75rem;
	text-align: right;
}
</style>
