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

      currentUser(context, { token }) {
        console.log('in store tracking --------------------------------------------------------')
        return authAPI.currentUser(token)
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
      },

      createManga(context, mangaData) {
        var form = new FormData()
        form.append('name', mangaData.name)
        form.append('author', mangaData.author)
        form.append('status', mangaData.status)
        form.append('demographic', mangaData.demographic)
        form.append('description', mangaData.description)
        form.append('genreList', JSON.stringify(mangaData.genreList))
        form.append('fileBinary', mangaData.fileBinary, 'cover.jpg')
        return mangaAPI.create(form)
      }
    }
  })
}