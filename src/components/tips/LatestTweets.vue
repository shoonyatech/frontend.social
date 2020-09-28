<template>
  <div class="host">
    <h1>
      Tips
      <span
        v-if="!infiniteScroll"
        class="navigation-button"
      >
        <button
          :disabled="Tips.length === 0"
          @click="loadTips('next')"
        >
          &#8250;
        </button>
        <button
          :disabled="page === 1"
          @click="loadTips('previous')"
        >
          &#8249;
        </button>
      </span>
    </h1>

    <div
      v-infinite-scroll="loadTips"
      infinite-scroll-disabled="isDisableInfiniteScroll"
      infinite-scroll-distance="limit"
      class="Tips"
    >
      <div v-if="Tips.length">
        <TipStrip
          v-for="(tip, index) in Tips"
          :key="index"
          :tip="tip"
        />
      </div>
      <div v-else>
        No Tips found!
      </div>
    </div>
  </div>
</template>

<script>
import TipStrip from '@/components/tips/TipStrip';
import tipsService from '@/services/tips.service';

export default {
	components: { TipStrip },
	props: {
		tip: {
			type: String,
			default: null,
			required: false,
		},
		infiniteScroll: {
			type: Boolean,
			default: true,
		},
		limit: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			Tips: [],
		};
	},
	computed: {
		isDisableInfiniteScroll() {
			return !this.infiniteScroll || this.busy;
		},
	},
	created() {
		if (!this.infiniteScroll) {
			this.loadTips();
		}
	},
	methods: {
		loadTips(action) {
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
			this.limit = this.limit || 5;
			this.page = action + this.page || 1;

			tipsService
				.getTips(`tags=${this.tip}`, this.limit, this.page)
				.then((Tips) => {
					if (!this.infiniteScroll) {
						this.Tips = Tips;
					} else {
						this.Tips = this.Tips.concat(Tips);
						if (Tips.length > 0) {
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

.Tips {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.tip {
	margin-bottom: 40px;
}

.courtesy {
	font-size: 0.75rem;
	text-align: right;
}

.navigation-button {
	float: right;
}
</style>
