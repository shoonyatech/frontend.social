<template>
  <div>
    <b-card>
      <h2>Result</h2>
      <div
        v-for="(option, index) in result"
        :key="index"
      >
        <div class="option-container">
          {{ option.key }}|{{ option.value }}
        </div>
      </div>
    </b-card>
    <br>
  </div>
</template>

<script>
export default {
	name: 'QuestionStrip',
	components: {},
	props: {
		result: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {},
};
</script>

<style scoped lang="scss">
/* style for course thumbnail */

.option-container {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: rgb(48, 190, 238);
	color: white;
}
.option-container:hover {
	border-style: solid;
	padding: 10px;
	border-color: #dfdfdf;
	border-width: 1px;
	margin-bottom: 1px;
	background-color: black;
	color: white;
	cursor: pointer;
}
</style>
