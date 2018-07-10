<template>
  <div class="register">
    <panel color="#27c6e2" padding="40px" templateCol="1fr">
      <span slot="header">Register</span>

      <div>
        <input id="username" v-model="username" type="text" placeholder="username..."/>
        <small>Your username cannot have space.</small>
      </div>
      <div>
        <input v-model="email" type="email" placeholder="email..."/>
        <small>Each account can only use one email.</small>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="password..."/>
        <small>Password cannot be less than 6 characters.</small>
      </div>
      <div>
        <input v-model="passConfirm" type="password" placeholder="password confirm..."/>
        <small>Confirm your password.</small>
      </div>
      <custom-button color="#6cc949" ref="submitButton" @click.prevent="submit" type="submit">Become a member!</custom-button>
    </panel>
  </div>
</template>

<script>
import CustomButton from '@/CustomButton'

export default {
  name: 'Register',
  components: {
    CustomButton
  },
  title() {
    return 'Register - Moonlight'
  },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      passConfirm: ''
    }
  },
  methods: {
    submit() {
      this.$refs.submitButton.setAttribute('disabled', 'disabled')

      const payload = {
        username: this.username,
        email: this.email,
        password: this.password,
        passConfirm: this.passConfirm
      }
      this.$store.dispatch('createUser', payload)
      .then(res => {
        this.$router.push({ name: 'Login' })
      })
      .catch(err => {
        this.$refs.submitButton.removeAttribute('disabled')
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>

button {
  cursor: pointer;
  height: 50px;
  width: 70%;
  justify-self: center;
}

small {
  color: #949494;
}

@media only screen and (max-width: 768px) {
  .register {
    width: 92%;
    text-align: center;
    margin: 0 auto;

    input {
      height: 40px;
      font-size: 15px;
      width: 100%;
    }

    small {
      display: none;
    }
  }
} 
@media only screen and (min-width: 768px) {
  .register {
    width: 30%;
    margin: 0 auto;

    input {
      height: 30px;
      width: 100%;
    }
  }
}
</style>
