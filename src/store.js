import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import mangaAPI from './api/manga'
import userAPI from './api/user'
import authAPI from './api/auth'

export function createStore() {
  return new Vuex.Store({
    state: {
      manga: null,
      mangaList: [],

      currentUser: null
    },
    mutations: {
      setMangaList(state, list) {
        state.mangaList = list
      },
      setManga(state, manga) {
        state.manga = manga
      },

      setCurrentUser(state, user) {
        state.currentUser = user
      }
    },
    actions: {
      fetchMangaList(context, payload) {
        return mangaAPI.get(payload.page, payload.limit)
          .then(res => {
            context.commit('setMangaList', res.data)
          })
          .catch(err => {
            console.log(err)
          })
      },

      createUser(context, payload) {
        return userAPI.create(payload)
          .then(res => {
            console.log('then in store.')
            console.log(res)
          })
      },

      currentUser(context, { hostname, token }) {
        console.log('in store tracking --------------------------------------------------------')
        return authAPI.currentUser(hostname, token)
          .then(res => {
            context.commit('setCurrentUser', res.data)
          })
          .catch(err => {
            console.log('Action dispatch error:')
            console.log(err.response ? err.response.data : `Can't get to ${err.request._currentUrl}`)
          })
      },

      logout(context) {
        return authAPI.logout()
          .then(() => {
            context.commit('setCurrentUser', null)
          })
          .catch(err => {
            console.log(err.response ? err.response.data : `Can't get to ${err.request._currentUrl}`)
          })
      }
    }
  })
}