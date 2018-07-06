import axios from 'axios'
const apiURL = `/api/user`
const apiURLDash = apiURL + '/'

axios.defaults.withCredentials = true

export default {
  get: function() {
    
  },
  getById: function() {
    
  },
  create: function(userData) {
    return axios.post(apiURL, userData)
  },
  
  update: function() {

  },
  
  delete: function() {
  }  
}
