<template>
  <div>
    <div v-if="editMode">
      <input
        v-model="city"
        class="left-input"
      >
      <input
        v-model="country"
        class="left-input"
      >
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
export default {
  name: "EditCity",
  props: {
    editMode: {
      type: Boolean
    }
  },
  data() {
    return {
      city: null,
      country: null
    };
  }
};
</script>

<style scoped lang="scss">
.event-strip {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  height: 80px;
  position: relative;
  border-bottom: dotted 1px #aada20;
  padding-bottom: 10px;
  margin-right: 20px;
}

.event-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.event-type {
  font-size: 0.65rem;
  color: #2c3e50;
  float: right;
}

.event-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.links {
  position: absolute;
  right: 10px;
  top: 20px;
}

.icon-links {
  display: flex;
  flex-direction: row;
}
</style>
