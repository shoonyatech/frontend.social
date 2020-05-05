<template>
  <div class="host">
    <div class="value-list">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="items"
      >
        <slot :item="item" />
        <div
          v-if="isEditable"
          class="delete"
          :data-index="index"
          @click="deleteItem(item)"
        >
          <img
            :src="`/images/delete.svg`"
            class="icon-button"
            alt="Delete"
          >
        </div>
      </div>
      <div v-if="isEditable">
        <input
          v-if="isEditable"
          v-model="searchText"
          :placeholder="placeholder"
          class="search-box"
          @input="onSearchTextChange"
        >
        <span
          v-for="(option, index) in options"
          :key="index"
          class="value"
        >
          <div
            class="select-item"
            @click="add(option)"
          >
            <slot
              :option="option"
              name="option"
            />
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {uniqBy} from 'lodash';

export default {
  name: 'MultiSelect',
  components: {},
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    isEditable: {
      type: Boolean,
      default: false
    },
    searchFn: {
      type: Function,
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    }
  },
  data() {
    return {
      searchText: "",
      options: [],
    };
  },
  methods: {
    add: function(item) {
      this.$emit("update:items", uniqBy([...this.items, item], '_id'));
    },
    deleteItem: function(event) {
      this.$emit("update:items", this.items.filter(x => x !== event));
    },
    onSearchTextChange: function(e) {
      if (this.searchText) {
        this.searchFn(this.searchText)
        .then(options => {
          this.options = options;
        });
      } else {
        this.options = [];
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

.label {
  color: #114273;
  width: 7rem;
  min-width: 7rem;
}

.value {
  display: flex;
}

.value-list {
  flex: 1 1 auto;
}


.items {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.delete {
  margin-left: 10px;
}

.select-item {
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: #1142736c;
  }
}

.search-box {
  width: 100%;
}
</style>
