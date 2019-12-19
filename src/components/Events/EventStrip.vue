<template>
  <div class="host">
    <a
      class="city-event"
      :href="event.url"
    >
      <span>{{ event.name }}</span>
      <div class="event-date">
        <span>{{ event.dateFrom | moment("DD MMM YYYY") }} - </span>
        <span>{{ event.dateTo | moment("DD MMM YYYY") }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object
    }
  }
};
</script>

<style scoped>
.host {
  width: 100%;
  display: flex;
}

.city-event {
  flex: 0 1 auto;
  font-size: 0.8rem;
  margin: 10px;
  width: 100%;
}

.event-line {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}
</style>
