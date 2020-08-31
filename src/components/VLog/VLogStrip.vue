<template>
  <div class="vlog">
    <div class="vlog-title">
      <a @click="onClick">
        {{ vlog.title }}
      </a>
      <div class="info-section">
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="editVLog"
        >
          <img
            :src="`/images/edit.svg`"
            class="icon-button"
            alt="edit"
          >
        </span>
        <span
          v-if="canModify"
          class="event-action"
          @click.prevent="deleteVLog"
        >
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
            alt="delete"
          >
        </span>
      </div>
    </div>
    <div
      ref="description"
      class="vlog-description"
      :class="{
        expanded: isExpanded,
        collapsed: isOverflow,
      }"
      v-html="vlog.description"
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
import { VLogType } from "@/constants/constants";

export default {
  name: "VLogStrip",
  components: {
    Arrow,
  },
  props: {
    vlog: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
      isOverflow: false,
      showArrow: false,
    };
  },
  computed: {
    canModify() {
      return this.$store.getters.isAdmin;
    },
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
      if (this.type === VLogType.CATCHUP) {
        this.$router.push(`/catchup/${this.vlog.uniqueId}`);
      } else {
        this.$router.push(`/freelancing/${this.vlog.uniqueId}`);
      }
    },
    deleteVLog() {
      this.$emit("delete", this.vlog._id);
    },
    editVLog() {
      this.$router.push(`/vlog/form/${this.vlog._id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.vlog {
  flex: 0 1 auto;
  font-size: 0.9rem;
  margin: 10px;
  width: 95%;
  position: relative;
  border-bottom: dotted 1px #114273;
  padding-bottom: 10px;
  margin-right: 20px;
}

.vlog-description {
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
.vlog-title {
  display: flex;
  justify-content: space-between;
}
.capsule {
  font-size: 0.65rem;
}
.info-section {
  display: flex;
  align-items: center;
}
</style>
