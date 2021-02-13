<template>
  <hsc-window 
    ref="zElement"
    :title="item.title"
    :left.sync="item.pos.x" 
    :top.sync="item.pos.y"
    :resizable="true"
    :width.sync="item.size.w" 
    :height.sync="item.size.h"
    :close-button="true"
    :is-open.sync="isOpen"
    @move-end="update('move')"
    @resize-end="update('resize')"
  >
    Parameters:
    <fieldset>
    </fieldset>
  </hsc-window>
</template>

<script>
export default {
  name: 'WindowItem',
  props: {
    item: {
      type: Object,
      default: () => ({
        title: 'Title 0',
        size: { w: 300, h: 100 },
        pos: { x: 0, y: 0 },
        zGroup: 0,
      })
    },
    //Инкремент растяжения по сетке
    gridPx: {
      type: Number,
      default: 1,
    }
  },
  data() {
    return { oldItem: JSON.parse(JSON.stringify(this.item)) }; 
  },
  computed: {
    isOpen: {
      get: function () {
        return true;
      },
      set: function () {
        this.$emit('item-remove');
      },
    }
  },
  mounted() {
    this.$refs.zElement.zIndex = this.item.zIndex;
    this.$watch (
      () => {
        return this.$refs.zElement.zIndex;
      },
      (val) => {
        this.item.zIndex = val;
        this.update();
      }
    );
  },
  methods: {
    update(methodName = 'zindex') {
      if (methodName === 'move') {
        this.item.pos.x = this.calcGrid(this.oldItem.pos.x, this.item.pos.x);
        this.item.pos.y = this.calcGrid(this.oldItem.pos.y, this.item.pos.y);
        this.oldItem = JSON.parse(JSON.stringify(this.item));
      } else if (methodName === 'resize') {
        this.item.size.w = this.calcGrid(this.oldItem.size.w, this.item.size.w);
        this.item.size.h = this.calcGrid(this.oldItem.size.h, this.item.size.h);
        this.oldItem = JSON.parse(JSON.stringify(this.item));
      }
      this.$emit('item-update', this.item);
    },

    calcGrid(oldVal, newVal) {
      if (oldVal === newVal) {
        return oldVal;
      }
      const diff = (oldVal > newVal)? oldVal - newVal : newVal - oldVal;
      const currentDiff = Math.ceil(diff / this.gridPx) * this.gridPx;
      const newValue = (oldVal > newVal)? oldVal - currentDiff : oldVal + currentDiff;
      return newValue;
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
