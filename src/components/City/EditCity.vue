<template>
  <div>
    <div v-if="editMode">
      <input
        v-model="city"
        class="left-input"
        placeholder="City"
      >
      <country-select
        v-model="country"
        :country="country"
        class="left-input"
      />
    </div>
    <div v-else>
      <div v-if="city">
        <a :href="`/city/${city}/${country}`">
          <span class="user-city">{{ city }}</span>,
          <span class="user-country">
            {{ country }}
          </span>
        </a>
      </div>
      <div v-else>
        [Add your city]
      </div>
    </div>
  </div>
</template>

<script>
import { CountrySelect } from "vue-country-region-select";
export default {
  name: "EditCity",
  components: { CountrySelect },
  props: {
    editMode: {
      type: Boolean
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.left-input {
  width: 100%;
}
</style>
