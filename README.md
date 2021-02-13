## Интерактивный рабочий стол (url: /)

Оконный UI с динамическим сохранением в LocalStorage состояния стола (видимые/удаленные окна с их параметрами - размеры, положение, z-index) и восстановлением этого состояния при перезагрузке браузера.

Используемые сторонние библиотеки:

-   @hscmap/vue-window
-   vuex-persistedstate

В качестве оконного UI было использовано расширение для VUE `@hscmap/vue-window`, которое подключется непосредственно только на этой странице. Однако сам ф-л окна обернут в компонент `./src/components/WindowItem.vue` для реализации таких специфичных свойств, как корректировка позиционирования/размера согласно заданной сетки и отслеживания/проброса изменяемых свойств окна. Представление `./src/views/Home.vue` подписывается на события компонента и изменяет состояние хранилища Vuex. Само хранилище `./src/store/modules/windows.js` представлено в виде двух масивов - активные и удаленные окна, методов - обновить, удалить и восстановить. Синхронизация хранилища с localStorage реализовано в расширении `vuex-persistedstate`

## Взаимодействие с сервером по протоколу websocket (url: /blockchain)

Подписку на новые неподтвержденные биткоин-транзакции с помощью Blockchain WebSocket API (https://blockchain.info/ru/api/api_websocket).

Используемые сторонние библиотеки:

-   vue-native-websocket


## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).