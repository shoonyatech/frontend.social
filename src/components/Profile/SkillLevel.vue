<template>
  <div class="host">
    <span :class="{ skillNameEditable: isEditable, skillName: !isEditable }">
      <EditableValue
        :value="name"
        :is-editable="isEditable"
        :placeholder="'React'"
        :typeahead="true"
        :typeahead-source="skills"
        @change="onNameChange"
      />
    </span>
    <span class="skill-years">
      <b>
        <EditableValue
          :value="noOfYears"
          :is-editable="isEditable"
          :placeholder="'2'"
          @change="onYearChange"
        /></b>years
    </span>
    <span
      v-if="isEditable"
      class="skill-rating desktop"
    >
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 1, editable: isEditable }"
        @click="onRatingChange(1)"
      >🤒</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 2, editable: isEditable }"
        @click="onRatingChange(2)"
      >🤔</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 3, editable: isEditable }"
        @click="onRatingChange(3)"
      >🙂</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 4, editable: isEditable }"
        @click="onRatingChange(4)"
      >🤓</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 5, editable: isEditable }"
        @click="onRatingChange(5)"
      >💯</span>
    </span>
    <span
      v-if="isEditable"
      class="skill-rating-mobile mobile"
    >
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 1, editable: isEditable }"
        @click="onRatingChange(1)"
      >🤒</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 2, editable: isEditable }"
        @click="onRatingChange(2)"
      >🤔</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 3, editable: isEditable }"
        @click="onRatingChange(3)"
      >🙂</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 4, editable: isEditable }"
        @click="onRatingChange(4)"
      >🤓</span>
      <span
        class="skill-rating-icon"
        :class="{ selected: skill.rating === 5, editable: isEditable }"
        @click="onRatingChange(5)"
      >💯</span>
    </span>
    <span
      v-else
      class="skill-rating"
    ><span
       v-if="skill.rating < 3"
       class="red"
     >{{ skill.rating }}/5</span>
      <span v-else>{{ skill.rating }}/5</span>
    </span>
  </div>
</template>

<script>
import EditableValue from '@/components/common/EditableValue';

export default {
  components: { EditableValue },
  props: {
    name: {
      type: String,
      default: '',
    },
    noOfYears: {
      type: Number,
      default: 0,
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
      name: this.name,
      noOfYears: this.noOfYears,
      rating: this.rating,
    };
  },
  methods: {
    onNameChange: function (val) {
      this.skill.name = val;
      this.$emit('change', { index: this.index, skill: this.skill });
    },
    onYearChange: function (val) {
      this.skill.noOfYears = Number(val);
      this.$emit('change', { index: this.index, skill: this.skill });
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
.red {
  color: red;
}
.host {
  display: flex;
  width: 100%;
  text-align: left;
}

.skillName {
  flex: 0 0 auto;
  width: 50%;
  margin-right: 1rem;
}
.skillNameEditable {
  flex: 0 0 auto;
  width: 30%;
  margin-right: 1rem;
}
.skill-years {
  flex: 0 0 auto;
  width: 20%;
  color: #40678e;
  margin-right: 1rem;
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
.skill-rating-mobile {
  flex: 1 1 auto;
  margin-left: 5px auto;
  flex-direction: column;
  width: 100%;
  color: #40678e;
}
.skill-rating {
  flex: 1 1 auto;
  margin-left: 2px auto;
  width: 100%;
  color: #40678e;
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
