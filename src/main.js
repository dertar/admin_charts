import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.use(Buefy, {
  defaultIconPack: 'fa'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
