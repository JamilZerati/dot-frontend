import Vue from 'vue'
import Vuex from 'vuex'

import cart from './carrinho'
import favorites from './favorites'

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      cart,
      favorites

    },
    strict: process.env.DEBUGGING
  })

  return Store
}
