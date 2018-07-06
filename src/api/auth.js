import axios from 'axios'
const apiURL = `/auth/`

axios.defaults.withCredentials = true

export default {
  login(username, password, remember) {
    const form = {
      username: username,
      password: password,
      remember: remember
    }
    return axios.post(apiURL + 'login', form)
  },

  logout() {
    return axios.post(apiURL + 'logout')
  },

  currentUser(hostname, token) {
    console.log('API currentUser tracking --------------------------------------------------------')
    if (hostname) {
      const config = {
        headers: {
          Cookie: `access_token=${token}`
        }
      }
      return axios.get(`${hostname}${apiURL}current-user`, config)
    }
    else {
      return axios.get(`${apiURL}current-user`)
    }
  }
}