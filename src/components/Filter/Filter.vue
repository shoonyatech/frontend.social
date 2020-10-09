<template>
  <div class="filter">
    <input
      :id="id"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @input="onClick(id)"
    >
    <label :for="id">{{ label | uppercase(true) }}</label>
  </div>
</template>

<script>
export default {
	components: {},
	filters: {
		uppercase: function (value, onlyFirstCharacter) {
			if (!value) {
				return '';
			}

			value = value.toString();

			if (onlyFirstCharacter) {
				return value.charAt(0).toUpperCase() + value.slice(1);
			} else {
				return value.toUpperCase();
			}
		},
	},
	props: {
		label: {
			type: String,
			default: '',
		},
		name: {
			type: String,
			default: '',
		},
		onClick: {
			type: Function,
			default: () => {},
		},
		type: {
			type: String,
			default: 'checkbox',
		},
		value: {
			type: String,
			default: '',
		},
		id: {
			type: String,
			default: '',
		},
		isSelected: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style scoped lang="scss">
.filter {
	display: flex;
}

.filter > label {
	margin-left: 10px;
	margin-bottom: 0;
	color: var(--fs-primary-color);
}
</style>
