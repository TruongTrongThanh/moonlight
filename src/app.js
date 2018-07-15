import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { config } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Panel from '@/Panel'

import('Assets/logo.png')

library.add(faSearch)
library.add(faBars)
config.autoAddCss = false

function getTitle(vm) {
  // components can simply provide a `title` option
  // which can be either a string or a function
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

export function createApp() {
  const router = createRouter()
  const store = createStore()

  Vue.component('font-icon', FontAwesomeIcon)

  Vue.mixin({
    components: {
      Panel
    },

    created() {
      const title = getTitle(this)
      if (title && this.$ssrContext) {
        this.$ssrContext.title = title
      }
    },
    mounted() {
      const title = getTitle(this)
      if (title) {
        document.title = title
      }
    }
  })

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}