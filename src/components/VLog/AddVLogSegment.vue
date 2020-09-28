<template>
  <div>
    <b-row
      v-for="(segment, index) in segmentsModel"
      :key="index"
    >
      <b-col sm="4">
        <input
          type="number"
          placeholder="Time in seconds"
          :value="segment.time"
          @input="onTimeChange(index, $event)"
        >
      </b-col>
      <b-col sm="6">
        <input
          placeholder="Context"
          :value="segment.description"
          @input="onDescriptionChange(index, $event)"
        >
      </b-col>
      <b-col
        sm="2"
        class="buttons-wrapper"
      >
        <div class="button-container">
          <button
            class="add"
            @click.prevent="addSegment"
          >
            +
          </button>
        </div>
        <div class="button-container">
          <button
            class="delete"
            @click.prevent="deleteSegment(index)"
          >
            -
          </button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
	name: 'AddVLogSegments',
	components: {},
	props: {
		segments: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {};
	},
	computed: {
		segmentsModel() {
			return this.segments.length
				? this.segments
				: [{ time: null, description: '' }];
		},
	},
	methods: {
		onTimeChange(index, event) {
			this.$emit(
				'update:segments',
				this.segmentsModel.map((val, i) =>
					index === i ? { ...val, time: event.target.value } : val
				)
			);
		},
		onDescriptionChange(index, value) {
			this.$emit(
				'update:segments',
				this.segmentsModel.map((val, i) =>
					index === i ? { ...val, description: event.target.value } : val
				)
			);
		},
		addSegment() {
			this.$emit('update:segments', [
				...this.segmentsModel,
				{ time: null, description: '' },
			]);
		},
		deleteSegment(index) {
			this.$emit(
				'update:segments',
				this.segmentsModel.filter((_, i) => i !== index)
			);
		},
	},
};
</script>

<style lang="scss">
input {
	width: 100%;
}
.button-container {
	display: inline-block;
}

.add,
.delete {
	margin: 2px 0 0 10px;
	height: 1.5rem;
}

.buttons-wrapper {
	display: flex;
	justify-content: flex-end;
}
</style>
