<template>
  <div
    v-if="!startDateEdit"
    class="host"
  >
    <span class="skill-name">
      <EditableValue
        :value="label"
        :is-editable="isEditable"
        :placeholder="'Skill'"
        @change="onNameChange"
      />
    </span>
  </div>
  <div
    v-else
    class="host"
  >
    <span class="skill-name">
      <EditableValue
        :value="start"
        :is-editable="isEditable"
        :placeholder="'Start Year'"
        @change="onStartChange"
      />
      <EditableValue
        :value="end"
        :is-editable="isEditable"
        :placeholder="'End Year'"
        @change="onEndChange"
      />
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
    label: {
      type: String,
      default: '',
    },
    startDateEdit: {
      type: Boolean,
      default: false,
    },
    start: {
      type: Number,
      default: 0,
    },
    end: {
      type: Number,
      default: 0,
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
      year: {},
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
      previousLabel: this.label,
    };
    this.year = {
      start: this.start,
      end: this.end,
    };
  },
  methods: {
    onNameChange: function (val) {
      this.skill.label = val;
      this.$emit('change', { index: this.index, skill: this.skill });
    },
    onEndChange: function (val) {
      var currentYear = new Date();
      currentYear = currentYear.getFullYear();
      if (val <= currentYear) {
        this.year.end = val;
      } else {
        this.year.end = this.end;
      }
      this.$emit('change', { index: this.index, year: this.year });
    },
    onStartChange: function (val) {
      if (val < this.end) {
        this.year.start = val;
      } else {
        this.year.start = this.start;
      }
      this.$emit('change', { index: this.index, year: this.year });
    },
  },
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
  width: 100%;
  margin-right: 0.5rem;
}

.skill-years {
  flex: 0 0 auto;
  width: 2rem;
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
