import Vue from 'vue'
import Vuex from 'vuex'

import cart from './carrinho'
import favorites from './favorites'
import movies from './movies'
import VueObserveVisibility from "vue-observe-visibility";

Vue.use(Vuex)
Vue.use(VueObserveVisibility);



export default function () {
  
  const Store = new Vuex.Store({
    modules: {
      cart,
      favorites,
      movies

    },
    strict: process.env.DEBUGGING
  })

  return Store
}
