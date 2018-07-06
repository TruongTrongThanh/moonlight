<template>
  <div class="login">
    <input v-model="username" type="text" placeholder="Username or email..."/>
    <input v-model="password" type="password" placeholder="Password..."/>
    <input v-model="isRemember" type="checkbox"/>Remember me!
    <input @click.prevent="login" type="submit" value="Login"/>
  </div>
</template>

<script>
import Auth from '../api/auth'
export default {
  name: 'Login',
  title() {
    return 'Login - Moonlight'
  },
  data() {
    return {
      username: '',
      password: '',
      isRemember: true
    }
  },
  methods: {
    login() {
      Auth.login(this.username, this.password, this.isRemember)
      .then(res => {
        this.$store.commit('setCurrentUser', res.data)
        this.$router.push({name: 'Home'})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
