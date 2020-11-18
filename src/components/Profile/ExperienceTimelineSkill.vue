<template>
  <div class="host">
    <span class="skill-name">
      <EditableValue
        :value="label"
        :is-editable="isEditable"
        :placeholder="'Skill'"
        @change="onNameChange"
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
      previousLabel: this.label,
    };
  },
  methods: {
    onNameChange: function (val) {
      this.skill.label = val;
      this.$emit('change', { index: this.index, skill: this.skill });
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
  width: 15rem;
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
