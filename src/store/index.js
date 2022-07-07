import Vue from 'vue'
import Vuex from 'vuex'

import cart from './carrinho'

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      cart

    },
    strict: process.env.DEBUGGING
  })

  return Store
}
