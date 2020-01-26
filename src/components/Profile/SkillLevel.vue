<template>
  <div class="host">
    <span class="skill-name">
      <EditableValue
        :value="name"
        :is-editable="isEditable"
        :placeholder="'React'"
        @click="onNameChange"
      />
    </span>
    <span class="skill-years">
      <EditableValue
        :value="noOfYears"
        :is-editable="isEditable"
        :placeholder="'2'"
        @click="onYearChange"
      />
    </span>
    <span class="skill-rating">
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 0, editable: isEditable }"
        @click="onRatingChange(0)"
      >🤒</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 1, editable: isEditable }"
        @click="onRatingChange(1)"
      >🤔</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 2, editable: isEditable }"
        @click="onRatingChange(2)"
      >🙂</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 3, editable: isEditable }"
        @click="onRatingChange(3)"
      >🤓</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 4, editable: isEditable }"
        @click="onRatingChange(4)"
      >💯</span>
    </span>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    name: {
      type: String,
      default: ""
    },
    noOfYears: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    index: {
      type: Number,
      default: 0
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      skill: {}
    };
  },
  created() {
    this.skill = {
      name: this.name,
      noOfYears: this.noOfYears,
      rating: this.rating
    };
  },
  methods: {
    onNameChange: function(val) {
      this.skill.name = val;
      this.$emit("change", { index: this.index, skill: this.skill });
    },
    onYearChange: function(val) {
      this.skill.noOfYears = Number(val);
      this.$emit("change", { index: this.index, skill: this.skill });
    },
    onRatingChange: function(rating) {
      if (this.isEditable) {
        this.skill.rating = rating;
        this.$emit("change", { index: this.index, skill: this.skill });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  display: flex;
  width: 100%;
  text-align: left;
}

.skill-name {
  flex: 0 0 auto;
  width: 6rem;
  margin-right: 0.5rem;
}

.skill-years {
  flex: 0 0 auto;
  width: 2rem;
  margin-right: 0.5rem;
}

.editable-value {
  border: 3px solid #aada20;
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
