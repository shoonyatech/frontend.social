<template>
  <div class="event-strip">
    <b-row>
      <b-col md="12">
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
      </b-col>
    </b-row>
    <b-row>
      <b-col md="8">
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
        <SkillTags
          v-if="event.relatedSkills"
          :skills="event.relatedSkills"
        />
      </b-col>
      <b-col md="4">
        <div
          v-if="!isReadOnly"
          class="links icon-links"
        >
          <icon-link
            v-if="event.youtube"
            icon="/images/youtube.svg"
            :url="event.youtube"
          />
          <icon-link
            v-if="event.twitter"
            icon="/images/twitter.svg"
            :url="event.twitter"
          />
          <icon-link
            v-if="event.website"
            icon="/images/web.svg"
            :url="event.website"
          />
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <div
          class="event-description"
          :class="{ fullHeight: showMore, lessHeight: !showMore }"
        >
          {{ event.description }}
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="12"
        class="arrow-container"
      >
        <img
          v-if="!showMore"
          class="arrow"
          :src="'/images/down-arrow.svg'"
          @click="showMore = true"
        >
        <img
          v-if="showMore"
          class="arrow"
          :src="'/images/up-arrow.svg'"
          @click="showMore = false"
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import IconLink from "@/components/common/IconLink";
import SkillTags from "@/components/Skills/SkillTags";

export default {
  name: "EventStrip",
  components: {
    IconLink,
    SkillTags
  },
  props: {
    event: {
      type: Object
    },
    isReadOnly: {
      type: Boolean
    }
  },
  data() {
    return {
      showMore: false
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

.event-description {
  font-size: 0.8rem;
  overflow: hidden;
}

.event-skills {
  font-size: 0.65rem;
  color: #2c3e50;
}

.event-date {
  font-size: 0.65rem;
  color: #2c3e50;
}

.icon-links {
  display: flex;
  flex-direction: row-reverse;
}

.lessHeight {
  height: 50px;
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.fullHeight {
  height: auto;
}

.arrow-container {
  display: flex;
  justify-content: center;
}

.arrow {
  width: 15px;
  display: flex;
  cursor: pointer;
  color: #aada20;
}
</style>
