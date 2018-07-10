import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'

import Panel from '@/Panel'

import('Assets/logo.png')

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