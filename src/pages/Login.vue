<template>
  <div class="login">
    <panel color="#d32b78" templateCol="70% 1fr" padding="30px" rowGap="10px">
      <span slot="header">Login</span>

      <input class="col-area-2" id="username" v-model="username" type="text" placeholder="Username or email..."/>
      <input class="col-area-2" id="password" v-model="password" type="password" placeholder="Password..."/>
      <div class="error">{{ errorText }}</div>
      <div style="text-align: right; margin-bottom: 10px;"><input v-model="isRemember" type="checkbox"/>Remember me!</div>
      <div>
        <router-link class="col-area-2" :to="{ name: 'Register' }">Don't have an account?</router-link>
        <div class="col-area-2">Forgot password?</div>
      </div>
      <button @click.prevent="login">LOGIN</button>
    </panel>
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
      isRemember: true,
      
      errorText: ''
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
        this.errorText = err.response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  width: 40%;
  margin: 0 auto;

  .panel-content {
    > input {
      height: 30px;
    }

    button {
      border: none;
      border-radius: 5px;
      color: white;
      background-color: #d84c4ce6;
      cursor: pointer;
    }

    .error {
      color: red;
    }
  }
}

@media only screen and (max-width: 768px) {
  .panel {
    width: 92%;
  }
}
</style>
