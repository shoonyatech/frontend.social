<template>
  <div class="challenge">
    <div>
      <a @click="onClick">
        {{ challenge.title }}
      </a>
    </div>
    <div>
      <span v-if="challenge.startTime">
        {{
          challenge.startTime | moment("DD MMM YYYY")
        }}
      </span>
      <span v-if="challenge.endTime">-</span>
      <span v-if="challenge.endTime">
        {{
          challenge.endTime | moment("DD MMM YYYY")
        }}
      </span>
    </div>
    <div class="tags">
      Tags:
      {{ challenge.tags.join(", ") }}
    </div>

    <div
      ref="description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow
      }"
      v-html="challenge.problemStatement"
    />
    <div
      v-if="showArrow"
      class="arrow-container"
    >
      <Arrow
        :is-expanded="isExpanded"
        :on-click="toggleArrow"
      />
    </div>
  </div>
</template>

<script>
import Arrow from "../Arrow/Arrow";

export default {
  name: "ChallengeStrip",
  components: {
    Arrow,
  },
  props: {
    challenge: {
      type: Object
    }
  },
  data() {
    return {
      isExpanded: false,
      isOverflow: false,
      showArrow: false
    };
  },
  mounted() {
    var element = this.$refs.description;
    if (element) {
      this.isOverflow =
        element.offsetHeight < element.scrollHeight ||
        element.offsetWidth < element.scrollWidth;
      this.showArrow = this.isOverflow;
    }
  },
  methods: {
    toggleArrow() {
      this.isExpanded = !this.isExpanded;
      this.isOverflow = !this.isOverflow;
    },
    onClick() {
      this.$router.push(`/challenge/${this.challenge._id}`)
    }
  }
};
</script>

<style scoped lang="scss">
.challenge {
  border-bottom: dotted 1px #114273;
  padding: 10px;
  position: relative;
}

.challenge-description {
  font-size: 0.8rem;
  text-align: start;
  max-height: 100px;
  overflow: hidden;
}

.collapsed {
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(0, 0, 0, 1)),
    to(rgba(0, 0, 0, 0))
  );
}

.expanded {
  max-height: unset;
}

.arrow-container {
  display: flex;
  justify-content: center;
  align-content: center;
}
.company {
  font-weight: bold;
}

</style>
