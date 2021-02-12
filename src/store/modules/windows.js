const defaultData = [
  {
    title: 'Title 1',
    size: { w: 300, h: 100 },
    pos: { x: 0, y: 0 },
    zIndex: 0,
  },
  {
    title: 'Title 2',
    size: { w: 300, h: 100 },
    pos: { x: 0, y: 110 },
    zIndex: 0,
  },
  {
    title: 'Title 3',
    size: { w: 300, h: 100 },
    pos: { x: 0, y: 220 },
    zIndex: 0,
  },
  {
    title: 'Title 4',
    size: { w: 300, h: 100 },
    pos: { x: 0, y: 330 },
    zIndex: 0,
  },
  {
    title: 'Title 5',
    size: { w: 300, h: 100 },
    pos: { x: 0, y: 440 },
    zIndex: 0,
  },
];

export default {
  namespaced: true,
  state: {
    currentData: JSON.parse(JSON.stringify(defaultData)),
    removedData: [],
  },
  getters: {
    getCurrentData: state => {
      return state.currentData;
    },
    getRemovedData: state => {
      return state.removedData;
    },
  },
  mutations: {
    removeItem: (state, index) => {
      state.removedData.push(state.currentData.splice(index, 1)[0]);
    },
    restoreItem: (state, index) => {
      const removedItem = state.removedData.splice(index, 1)[0];
      // Положение и размеры сохранены, но скипнем на дефолтные
      removedItem.size = defaultData[0].size;
      // Позиция по центру
      removedItem.pos = {
        x: window.innerWidth / 2 - removedItem.size.w / 2,
        y: window.innerHeight / 2 - removedItem.size.h / 2,
      };
      state.currentData.push(removedItem);
    },
    update: (state, payload) => {
      state.currentData.splice(payload.i, 1, payload.obj);
    },
  },
};
