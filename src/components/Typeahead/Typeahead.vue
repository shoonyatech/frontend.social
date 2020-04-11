<template>
  <div
    ref="container"
    class="typeahead-container"
  >
    <slot>
      <input
        :value="query"
        type="text"
      >
    </slot>
    <ul
      v-show="this.openTypeahead"
      class="typeahead"
    >
      <li
        v-for="(match, index) in matches"
        :key="index"
        :class="{'active': isActive(index)}"
        @click="onClick(index)"
      >
        {{ match }}
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * PROPS
 * Souce: Array<string> - Values you want to display in dropdown
 * Query: String - Textbox value
 * 
 * How to use:
 * a). Pass the required props it will render the typeahead on the default input 
 *      <Typeahead :source="['a', 'a1', 'a2', 'a3']" :query.sync="myQuery"></Typeahead>
 * 
 * b). You can also hook it up with any custom input using slot like:
 * <Typeahead :source="['a', 'a1', 'a2', 'a3']" :query.sync="myQuery">
 *    <input type="text" style="border: 10px" v-model="myQuery">
 * </Typeahead> 
 */
export default {
  name: "Typeahead",
  props: {
    source: {
      type: Array,
      required: true
    },
    query: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      open: false,
      current: 0,
    }
  },
  computed: {
    matches() {
      const query = this.query.toLowerCase();
      return this.source.filter((str) => {
        return str.toLowerCase().indexOf(query) >= 0;
      });
    },
    openTypeahead() {
      return this.query !== "" &&
        this.matches.length != 0 &&
        this.open;
    }
  },
  mounted() {
    const input = this.$refs.container.querySelector('input');
    if (input) {
      input.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
          case 13: // Enter
            this.enter(e);
            break;
          case 38: // up
            this.up(e);
            break;
          case 40: // down
            this.down(e);
            break;
          default:
            // Do nothing
        }
      });

      input.addEventListener('input', (e) => {
        this.change(e);
      });
    }
  },
  methods: {
    enter() {
      this.updateQuery(this.matches[this.current]);
      this.open = false;
    },
    up() {
      if(this.current > 0) {
        this.current--;
      }
    },
    down() {
      if(this.current < this.matches.length - 1) {
        this.current++;
      }
    },
    isActive(index) {
      return index === this.current;
    },
    change(e) {
      if (this.open == false) {
        this.open = true;
        this.current = 0;
      }
      this.updateQuery(e.target.value);
    },
    onClick(index) {
      this.updateQuery(this.matches[index]);
      this.open = false;
    },
    updateQuery(query) {
      this.$emit('update:query', query);
    }
  }
}
</script>
<style scoped lang="scss">
.typeahead-container {
  position:relative;
}
.typeahead {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 10rem;
  padding: 0;
  margin: 0;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  width:100%;
  border: 1px solid #aada20;
  li {
    border-bottom: dotted 1px #aada18;
    cursor: pointer;
    padding: 2px;
    &:hover {
      background-color: #aada186c;
    }
    &.active {
      background-color: #aada186c;
    }
  }
}
</style>
