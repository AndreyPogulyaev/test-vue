<template>
  <div class="about">
    <h1>Сумма: {{ amount }} BTC</h1>
    <div class="container">
      <button type="button" class="bg-success" @click="start">
        Запуск
      </button>
      <button type="button" class="bg-danger" @click="stop">
        Остановка
      </button>
      <button type="button" class="bg-warning" @click="clear">
        Сброс
      </button>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in listOfTranc" :key="index">
            <td>
              <ul>
                <li v-for="(row, i) in item.inputs" :key="i">{{ row.prev_out.addr }}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li v-for="(row, i) in item.out" :key="i">{{ row.addr }}</li>
              </ul>
            </td>
            <td> {{ item.amount }} BTC</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blockchain',
  components: {},
  data() {
    return { 
      amount: 0,
      listOfTranc: [],
    };
  },
  created() {
    this.$connect();
    this.$socket.onmessage = MessageEvent => {
      const data = JSON.parse(MessageEvent.data);
      data.x.amount = data.x.out.reduce((a, c) => a + c.value/100000000, 0);
      this.listOfTranc.push(data.x);
      this.amount += data.x.amount;
    };
  },
  beforeDestroy() {
    this.$disconnect();
  },
  methods: {
    start() {
      this.$socket.sendObj({
        'op': 'unconfirmed_sub'
      });
    },
    stop() {
      this.$socket.sendObj({
        'op': 'unconfirmed_unsub'
      });
    },
    clear() {
      this.listOfTranc = [];
      this.amount = 0;
    }
  },

};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.table {
  margin-bottom: 1rem;
  background-color: transparent;
  border-collapse: collapse;

  td, th {
    border: 1px solid #dee2e6;
  }
}

ul {
  list-style-type: none;
}
.container {
  padding-bottom:20px;
}
button {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  padding: .375rem .75rem;
  font-size: 1rem;
  color: #fff;
  line-height: 1.5;
  border-radius: .25rem;
}
.bg-success {
  background-color: #28a745!important;
}
.bg-warning {
  background-color: #ffc107!important;
}
.bg-danger {
  background-color: #dc3545!important;
}
</style>