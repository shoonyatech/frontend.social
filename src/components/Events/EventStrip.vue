<template>
  <div class="event-strip">
    <a
      v-if="!isReadOnly"
      :href="event.website"
      target="_blank"
    >
      <span>{{ event.title }}</span>
      <span class="event-type">
        {{ event.type === "c" ? "conference" : "meetup" }}</span>
    </a>
    <div v-else>
      <span>{{ event.title }}</span>
      <span class="event-type">
        {{ event.type === "c" ? "conference" : "meetup" }}</span>
    </div>
    <div class="event-date">
      <span>{{ event.dateFrom | moment("DD MMM YYYY") }}</span>
      <span v-if="event.dateTo"> - </span>
      <span v-if="event.dateTo">{{
        event.dateTo | moment("DD MMM YYYY")
      }}</span>
      in
      <a
        :href="'/city/' + event.city + '/' + event.country"
      ><span class="city">{{ event.city }}, {{ event.country }}</span></a>
    </div>
    <div class="event-skills">
      {{ event.relatedSkills ? event.relatedSkills.join(", ") : "" }}
    </div>
    <div
      v-if="!isReadOnly"
      class="links icon-links"
    >
      <icon-link
        v-if="event.website"
        icon="/images/web.svg"
        :url="event.website"
      />
      <icon-link
        v-if="event.twitter"
        icon="/images/twitter.svg"
        :url="event.twitter"
      />
      <icon-link
        v-if="event.youtube"
        icon="/images/youtube.svg"
        :url="event.youtube"
      />
    </div>
  </div>
</template>

<script>
import IconLink from "@/components/common/IconLink";

export default {
  name: "EventStrip",
  components: {
    IconLink
  },
  props: {
    event: {
      type: Object
    },
    isReadOnly: {
      type: Boolean
    }
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
