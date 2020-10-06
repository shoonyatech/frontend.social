<template>
  <div class="freelancers">
    <Loader v-show="loading" />
    <b-container>
      <b-row>
        <b-col md="9">
          <h1>
            <span>Freelancers</span>
            <button @click="registerFreelancer()">
              + Register as a Freelancer
            </button>
          </h1>
          <div>
            <div
              v-infinite-scroll="loadFreelancers"
              :infinite-scroll-distance="limit"
              :infinite-scroll-disabled="isDisableInfiniteScroll"
            >
              <div v-if="freelancers.length">
                <FreelancerStrip
                  v-for="(freelancer, index) in freelancers"
                  :key="index"
                  :freelancer="freelancer"
                />
              </div>
              <div v-else>
                No freelancers found!
              </div>
            </div>
          </div>
        </b-col>
        <b-col md="3">
          <div class="filters-wrapper">
            <FreelancingFilter
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
			loading: false,
			page: 1,
			limit: 10,
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
	created() {
		if (!this.infiniteScroll) {
			this.loadFreelancers();
		}
	},
	methods: {
		onSearchParamsChange(param = '') {
			this.loading = true;
			this.loadFreelancers(param, true);
		},
		registerFreelancer() {
			this.$router.push('/job/freelancer/register/new');
		},
		loadFreelancers(param = '', filter = true) {
			let query = '';
			this.busy = true;
			this.limit = this.limit || 10;
			this.page = filter ? 1 : this.page || 1;

			freelancerService
				.getFreelancers(param, this.limit, this.page)
				.then((freelancers) => {
					if (filter) {
						this.freelancers = freelancers;
					} else this.freelancers = this.freelancers.concat(freelancers);
					if (freelancers.length > 0) {
						++this.page;
					}
					this.busy = false;
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
