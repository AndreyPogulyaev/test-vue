<template>
  <div class="home">
    <!-- Тут из геттера берем инфу -->
    <hsc-window-style-metal>
      <WindowItem 
        v-for="(item, index) in $store.getters['windows/getCurrentData']"
        :key="index" 
        :item="item"
        :grid-px="gridPx"
        @item-update="update($event, index)"
        @item-remove="remove(index)"
      ></WindowItem>
    </hsc-window-style-metal>
    <div>
      <label v-show="$store.getters['windows/getRemovedData'].length">
        Restore a window:
        <select v-model="selectedRemoved" class="restoreSelect">
          <option v-for="(rItem, i) in $store.getters['windows/getRemovedData']" :key="i" :value="i">
            {{ rItem.title }}
          </option>
        </select>
      </label>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import * as VueWindow from '@hscmap/vue-window';
import WindowItem from '@/components/WindowItem.vue';

export default {
  name: 'Home',
  components: {
    WindowItem
  },
  data() {
    //Инкремент растяжения по сетке
    return { gridPx: 10 };
  },
  computed: {
    selectedRemoved: {
      get: function () {
        return false;
      },
      set: function (value) {
        if (value !== false) {
          this.restore(value);
        }
      },
    }
  },
  created() {
    Vue.use(VueWindow);
  },
  methods: {
    update(newObj, index) {
      this.$store.commit('windows/update', {
        obj: newObj, 
        i: index
      });
    },
    remove(index) {
      this.$store.commit('windows/removeItem', index);
    },
    restore(index) {
      this.$store.commit('windows/restoreItem', index);
    }
  }
};
</script>

<style lang="scss">
  .restoreSelect {
    width:50px;
    padding: 5px;
  }
</style>