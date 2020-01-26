<template>
  <div class="host">
    <b-row>
      <b-col
        md="3"
        sm="12"
      >
        <span class="label">{{ label }}</span>
      </b-col>
      <b-col
        md="9"
        sm="12"
      >
        <div class="value-list">
          <span
            v-for="(value, index) in values"
            :key="index"
            class="value"
          >
            <EditableValue
              :value="value"
              :is-editable="isEditable"
              :index="index"
              class="value"
              :auto-select="autoSelect"
              @change="onChange"
            />
            <button
              v-if="isEditable"
              class="delete"
              :data-index="index"
              @click="deleteItem"
            >
              X
            </button>
          </span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="12"
        sm="12"
      >
        <div class="add-container">
          <button
            v-if="isEditable"
            class="add"
            @click="add"
          >
            +
          </button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import EditableValue from "@/components/common/EditableValue";

export default {
  components: { EditableValue },
  props: {
    label: {
      type: String,
      default: ""
    },
    values: {
      type: Array,
      default: () => [""]
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    autoSelect: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    add: function(event) {
      this.values.push("");
    },
    deleteItem: function(event) {
      const index = event.target.dataset.index;
      this.values.splice(index, 1);
      this.$emit("change", this.values);
    },
    onChange: function({ val, index }) {
      if (index < this.values.length) {
        this.values[index] = val;
      } else {
        this.values.push(val);
      }
      this.$emit("change", this.values);
    }
  }
};
</script>

<style scoped lang="scss">
.host {
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
}

.label {
  color: #aada18;
  width: 7rem;
  min-width: 7rem;
}

.value {
  display: flex;
  width: 100%;
}

.value-list {
  flex: 1 1 auto;
}

.add-container {
  width: 100%;
  text-align: right;
}

.add {
  flex: 0 0 auto;
  margin: 2px 0 0 10px;
  height: 1.5rem;
}

.delete {
  flex: 0 0 auto;
  margin: 2px 0 0 10px;
  height: 1.5rem;
  background-color: rgb(212, 68, 68);
}
</style>
