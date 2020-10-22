<template>
  <div>
    <div v-if="editMode">
      <div class="input-group">
        <input
          v-model="editedCity"
          :class="{ 'left-input-width': addCity, 'left-input': !addCity }"
          placeholder="City"
          @input="onSearchCityChange"
          @keyup.down="onArrowDown"
          @keyup.up="onArrowUp"
          @keyup.enter="onEnter"
          @click="showAll"
        ><span
          v-show="addCity"
          class="input-group-addon"
        >
          <button
            v-b-modal.add-city-modal
            class="mt-0"
            type="button"
          >
            Add
          </button>
        </span>
      </div>
      <AddCity />
      <div>
        <div
          v-for="(searchedCity, index) in options"
          :key="index"
          class="city-option"
          :class="{ 'is-active': index === arrowCounter }"
          @click="selectCity(searchedCity)"
        >
          {{ cityDisplayName(searchedCity) }}
        </div>
      </div>
      <country-select
        v-model="editedCountry"
        :country="editedCountry"
        class="left-input"
        @input="onSearchCityChange"
      />
    </div>
    <div v-else>
      <div v-if="city">
        <a
          name="city"
          :href="`/city/${city}/${country}`"
        >
          <span class="user-city">{{ city }}</span>,
          <span class="user-country">
            {{ country }}
          </span>
        </a>
      </div>
      <div
        v-else-if="showError"
        class="error"
      >
        [Add your city]
      </div>
    </div>
  </div>
</template>

<script>
import { CountrySelect } from 'vue-country-region-select';
import cityService from '@/services/city.service';
import AddCity from './AddCity';

export default {
	name: 'EditCity',
	components: {
		CountrySelect,
		AddCity,
	},
	props: {
		editMode: {
			type: Boolean,
			default: false,
		},
		city: {
			type: String,
			default: '',
		},
		country: {
			type: String,
			default: '',
		},
		addCity: {
			type: Boolean,
			default: false,
		},
		showError: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			editedCity: this.city,
			editedCountry: this.country,
			options: [],
			arrowCounter: -1,
		};
	},
	methods: {
		cityDisplayName(searchedCity) {
			return searchedCity.oldName
				? `${searchedCity.name} (${searchedCity.oldName}), ${searchedCity.country}`
				: `${searchedCity.name}, ${searchedCity.country}`;
		},
		onSearchCityChange: function (e) {
			cityService
				.getCities(this.editedCity, this.editedCountry)
				.then((cities) => {
					this.options = cities;
				});
			this.$emit('change', {
				name: this.editedCity,
				country: this.editedCountry,
			});
		},
		selectCity: function (searchedCity) {
			this.options = [];
			this.editedCity = searchedCity.name;
			this.editedCountry = searchedCity.country;
			this.$emit('change', searchedCity);
		},
		onArrowDown(evt) {
			if (this.arrowCounter < this.options.length) {
				this.arrowCounter = this.arrowCounter + 1;
			}
		},
		onArrowUp() {
			if (this.arrowCounter > 0) {
				this.arrowCounter = this.arrowCounter - 1;
			}
		},
		onEnter() {
			this.editedCity = this.options[this.arrowCounter].name;
			this.editedCountry = this.options[this.arrowCounter].country;
			this.addCity = false;
			this.arrowCounter = -1;
			this.options = [];
			this.$emit('change', {
				name: this.editedCity,
				country: this.editedCountry,
			});
		},
		showAll() {
			this.addCity = !this.addCity;
			this.addCity ? (this.options = this.items) : (this.options = []);
		},
	},
};
</script>

<style scoped lang="scss">
.left-input {
	width: 100%;
}

.left-input-width {
	width: 86%;
	margin-right: 10px;
}

.city-option {
	border-bottom: dotted 1px #114273;
	cursor: pointer;

	&:hover {
		background-color: #1142736c;
	}
}
.city-option.is-active,
.city-option:hover {
	background-color: #4aae9b;
	color: white;
}
.error {
	color: rgb(212, 68, 68);
	background-color: #38628c;
	font-weight: bold;
}

.display-none {
	display: none;
}
</style>
