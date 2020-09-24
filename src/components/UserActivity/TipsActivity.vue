<template>
  <div class="learn">
    <b-container>
      <b-row>
        <b-col
          md="12"
          class="text"
        >
          Tips Page : {{ tips.length }}
          <br>
          <UserTipsActivity
            v-for="(tip, index1) in tips"
            :key="index1"
            :tip="tip"
            :profile="tip.createdBy"
          />
          <br>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import UserTipsActivity from '@/components/tips/UserTipsActivity';
import tipsService from '@/services/tips.service';
import eventBus from '@/utilities/eventBus';
import { ToastType, messages } from '@/constants/constants';
export default {
	name: 'TipsActivity',
	components: { UserTipsActivity },
	props: {
		dateCreated: {
			type: String,
			default: () => {},
		},
	},
	data() {
		return {
			tips: [],
		};
	},
	created() {
		tipsService
			.getTipsAddedOnDate(this.dateCreated)
			.then((tip) => {
				this.tips = tip;
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
