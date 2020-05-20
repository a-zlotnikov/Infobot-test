import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import colors from 'vuetify/lib/util/colors'
import Vuetify from 'vuetify';

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: colors.red, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.red.base // #3F51B5
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
