<template>
  <div class="host">
    <span class="skill-name"> {{ name }}</span>
    <span class="skill-rating desktop">
      <span
        v-for="(value, i) in 5"
        :key="i"
        class="skill-rating-icon"
        :class="{ selected: skill.rating === value, editable: isEditable }"
        @click="onRatingChange(value)"
      >{{ value }}</span>
    </span>
    <span class="skill-rating-mobile mobile">
      <span
        v-for="(value, i) in 5"
        :key="i"
        class="skill-rating-icon"
        :class="{ selected: skill.rating === value, editable: isEditable }"
        @click="onRatingChange(value)"
      >{{ value }}</span>
    </span>
    <span class="skill-tag">
      <key-multi-value
        :is-editable="true"
        :values="tags"
        @change="onTagsChange"
      />
    </span>
  </div>
</template>

<script>
import KeyMultiValue from '@/components/common/KeyMultiValue';
export default {
  components: { KeyMultiValue },
  props: {
    name: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: () => [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    index: {
      type: Number,
      default: 0,
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      skill: {},
    };
  },
  computed: {
    skills() {
      return this.$store.state.skills;
    },
  },
  created() {
    this.skill = {
      label: this.label,
      name: this.name,
      rating: this.rating,
      tags: this.tags,
    };
  },
  methods: {
    onTagsChange: function (skills) {
      this.skill.tags = skills;
    },
    onRatingChange: function (rating) {
      if (this.isEditable) {
        this.skill.rating = rating;
        this.$emit('change', { index: this.index, skill: this.skill });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.mobile {
  display: none !important;
}
@media screen and (max-width: 759px) {
  .desktop {
    display: none !important;
  }

  .mobile {
    display: flex !important;
  }
}
.host {
  display: flex;
  width: 100%;
  text-align: left;
}

.skill-name {
  flex: 0 0 auto;
  width: 25%;
  margin-right: 0.5rem;
}

.skill-tag {
  width: 30%;
  flex: 0 0 auto;
  margin-right: 0.5rem;
}
.editable-value {
  border: 3px solid #114273;
  flex: 1 1 auto;
  margin: 2px auto;
  width: 100%;
  font-size: inherit;
  line-height: inherit;
  height: 1.5rem;
  padding: 0 10px;
}

.skill-rating {
  flex: 1 1 auto;
  margin: 2px auto;
  width: 100%;
}
.skill-rating-mobile {
  flex: 1 1 auto;
  margin: 2px auto;
  width: 100%;
  flex-direction: column;
}

.skill-rating-icon {
  flex: 1 1 auto;
  width: 20%;
  display: inline-block;
  text-align: center;
  opacity: 0.2;

  &.editable {
    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
}

.selected {
  opacity: 1;
}
</style>
