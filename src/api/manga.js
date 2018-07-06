import axios from 'axios'
const apiURL = `/api/`
const mangaURL = apiURL + 'manga'
const mangaURLDash = mangaURL + '/'

export default {
  get: function(page = null, limit = null) {
    const query = {
      page: page,
      limit: limit
    }
    return axios.get(mangaURL, {
      params: query
    })
  },
  getById: function(mangaId, page = null, limit = null) {
    const query = {
      page: page, 
      limit: limit
    }
    return axios.get(mangaURLDash + mangaId, {
      params: query
    })
  },
  create: function(mangaData) {
    return axios.post(mangaURL, mangaData)
  },
  
  update: function(mangaId, mangaData) {
    return axios.put(mangaURLDash + mangaId, mangaData)
  },
  
  delete: function(mangaId) {
    return axios.delete(mangaURLDash + mangaId)
  }  
}
