<template>
  <div class="host">
    <span class="skill-name">
      <EditableValue
        :value="name"
        :is-editable="isEditable"
        :placeholder="'React'"
        @change="onNameChange"
      />
    </span>
    <span class="skill-years">
      <EditableValue
        :value="noOfYears"
        :is-editable="isEditable"
        :placeholder="'2'"
        @change="onYearChange"
      />
    </span>
    <input
      :disabled="!isEditable"
      type="range"
      :value="rating"
      :max="max"
      class="editable-value"
      @change="onRatingChange"
    >
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
    onRatingChange: function(e) {
      this.skill.rating = Number(e.target.value);
      this.$emit("change", { index: this.index, skill: this.skill });
    }
  }
};
</script>

<style scoped>
.host {
  display: flex;
  width: 100%;
  padding-left: 10px;
  text-align: left;
}

.skill-name {
  flex: 0 0 auto;
  width: 6rem;
  margin-right: 1rem;
}

.skill-years {
  flex: 0 0 auto;
  width: 2rem;
  margin-right: 1rem;
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
</style>
