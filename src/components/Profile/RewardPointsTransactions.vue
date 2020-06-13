<template>
  <div>
    <b-table
      v-if="items.length"
      small
      striped
      hover
      :items="items"
    />
    <div v-else>
      No Transactions
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  components: {  },
  props: {
    values: {
      type: Array,
      default: () => {},
    },
  },
  computed: {
    items() {
      return this.values.map((val) => {
        return {
          date: moment(val.transactionDate).format('DD MMM YYYY HH:mm'),
          comment: val.comment,
          amount: val.credited ? val.credited : val.debited ? -val.debited : '-',
          status: val.status,
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">

</style>
