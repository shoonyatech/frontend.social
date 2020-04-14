<template>
  <div>
    <b-modal
      id="add-city-modal"
      ref="modal"
      title="Add Your City"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form
        ref="form"
        @submit.stop.prevent="handleSubmit"
      >
        <b-form-group
          :state="nameState"
          label="City"
          label-for="name-input"
          invalid-feedback="City name is required"
        >
          <input
            id="name-input"
            v-model.trim="name"
            placeholder="City"
            :state="nameState"
            required
            class="left-input"
          >
          <country-select
            v-model="editedCountry"
            :country="editedCountry"
            class="left-input"
          />
        </b-form-group>
      </form>
      <template v-slot:modal-footer>
        <button
          size="sm"
          variant="success"
          @click="handleOk"
        >
          Save
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import cityService from "@/services/city.service";
import { CountrySelect } from "vue-country-region-select";
import eventBus from "@/utilities/eventBus";
import { ToastType, messages } from "@/constants/constants";
export default {
  components: {
    CountrySelect
  },
  data() {
    return {
      name: '',
      nameState: null,
      submittedCity: [],
      editedCountry: ''
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      const payload = {
        name: this.name,
        country: this.editedCountry
      };
      cityService.addCity(payload).then(response => {
        eventBus.$emit('show-toast', {body: messages.city.cityAddSuccess, title: messages.generic.success});
      })
      .catch(error => {
        eventBus.$emit('show-toast', {body: messages.city.cityAddFailure, title: messages.generic.error, type: ToastType.ERROR});
      });
      this.$nextTick(() => {
        this.$bvModal.hide('add-city-modal')
      })
    }
  }
}
</script>

<style scoped>
.left-input {
  width: 100%;
}
</style>
