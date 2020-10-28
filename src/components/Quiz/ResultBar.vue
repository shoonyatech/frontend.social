<template>
  <div class="barchart">
    <div
      v-for="(user, index) in result"
      :key="index"
    >
      <div>
        <p class="text">
          <ResultStrip
            :result="user"
            :index="index"
          />
        </p>
      </div>
      <div v-if="index == 1">
        <p class="text">
          <img src="/images/gold-medal.svg">
        </p>
      </div>
      <div v-if="index == 0">
        <p class="text">
          <img src="/images/silver-medal.svg">
        </p>
      </div>
      <div v-if="index == 2">
        <p class="text">
          <img src="/images/bronze-medal.svg">
        </p>
      </div>
      <div
        class="bar"
        :style="{
          height: `${user.points / 3}px`,
          backgroundColor: `${color[index]}`,
        }"
      />
      <div>
        <p class="text">
          {{ user.points }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import ResultStrip from '@/components/Quiz/ResultStrip';
export default {
	components: {
		ResultStrip,
	},
	props: {
		result: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			color: ['#E0EDF3', '#FFC54B', '#FB963F'],
		};
	},
	methods: {},
};
</script>
<style>
.barchart {
	width: 100%;
	display: flex;
	flex-direction: row;
	color: black;
	justify-content: center;
	align-items: flex-end;
}
.bar {
	width: 100px;
	margin-right: 100px;
	text-align: center;
	margin-bottom: 5px;
}
.text {
	margin-right: 50px;
	width: 100px;
	text-align: center;
	color: black;
}
</style>
