<template>
  <div class="filter">
    <div
      v-if="id === '$' || id === '$$' || id === '$$$'"
      :id="id"
      class="capsule expertise"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @click="onClick(id)"
    >
      <label
        :for="id"
      ><p
         v-if="isSelected"
         class="NotSelected"
       >
         {{ label | uppercase(true) }}
       </p>
        <p
          v-if="!isSelected"
          class="labelSelected"
        >
          {{ label | uppercase(true) }}
        </p>
      </label>
    </div>
    <div
      v-if="id === 'FullTime' || id === 'PartTime'"
      :id="id"
      class="capsule expertise remote"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @click="onClick(id)"
    >
      <label
        :for="id"
      ><p
         v-if="isSelected"
         class="NotSelected"
       >
         {{ label | uppercase(true) }}
       </p>
        <p
          v-if="!isSelected"
          class="labelSelected"
        >
          {{ label | uppercase(true) }}
        </p></label>
    </div>
    <div
      v-if="id === 'OneTime' || id === 'Ongoing' || id === 'Monthly'"
      :id="id"
      class="capsule expertise price"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @click="onClick(id)"
    >
      <label
        :for="id"
      ><p
         v-if="isSelected"
         class="NotSelected"
       >
         {{ label | uppercase(true) }}
       </p>
        <p
          v-if="!isSelected"
          class="labelSelected"
        >
          {{ label | uppercase(true) }}
        </p></label>
    </div>
    <div
      v-if="id === 'FixedBudget' || id === 'Hourly'"
      :id="id"
      class="capsule expertise"
      :type="type"
      :value="value"
      :name="name"
      :checked="isSelected"
      @click="onClick(id)"
    >
      <label
        :for="id"
      ><p
         v-if="isSelected"
         class="NotSelected"
       >
         {{ label | uppercase(true) }}
       </p>
        <p
          v-if="!isSelected"
          class="labelSelected"
        >
          {{ label | uppercase(true) }}
        </p></label>
    </div>
    <br>
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
			default: 'radio',
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
	methods: {},
};
</script>

<style scoped lang="scss">
.filter {
	display: flex;
	color: white;
}
.capsule {
	color: var(--fs-bg);
	background-color: var(--fs-primary-color);
	padding: 0 10px;
	border-radius: 50px;
	height: 30px;
	margin: 0 2px;
	float: right;
}
.labelSelected {
	color: white;
}
.NotSelected {
	color: yellow;
}
.expertise {
	font-size: 0.8rem;
}
.remote {
	background: #c50606;
}
.duration {
	background: #114273;
}
.price {
	background: rgb(3, 179, 3);
}
.filter > label {
	margin-left: 10px;
	margin-bottom: 0;
	color: var(--fs-bg);
}
</style>
