import Vue from 'vue'
import App from './App'

import uView from "uview-ui";
Vue.use(uView);

import request from './until/request.js'
Vue.prototype.$request = request

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
