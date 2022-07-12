import Vue from 'vue'
import Vuex from 'vuex'

import cart from './carrinho'
import favorites from './favorites'
import movies from './movies'

Vue.use(Vuex)


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
