<template>
  <div class="register">
    <h1>Register</h1>
    <input id="username" v-model="username" type="text" placeholder="username..."/>
    <input v-model="email" type="email" placeholder="email..."/>
    <input v-model="password" type="password" placeholder="password..."/>
    <input v-model="passConfirm" type="password" placeholder="passowrd confirm..."/>
    <button>RESET</button>
    <button ref="submitButton" @click.prevent="submit" type="submit">SUBMIT</button>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
  }

@media only screen and (max-width: 768px) {
  .register {
    width: 85%;
    text-align: center;
    margin: 0 auto;

    input {
      box-sizing: border-box;
      display: block;
      width: 100%;
      font-size: 1em;
      height: 45px;
      padding-left: 5px;
      margin-bottom: 5px;
    }
    button {
      width: 100%;
      margin-bottom: 5px;
      height: 45px;
      border: none;
      border-radius: 5px;
      color: white;
      font-size: bold;
    }

    button:first-of-type {
      background-color: #d84c4ce6;
    }

    button:nth-of-type(2) {
      background-color: green;
    }
  }
}
@media only screen and (min-width: 768px) {
  .register {
    width: 40%;
    text-align: center;
    margin: 0 auto;
    background-color: white;
    padding: 50px;
    margin-top: 30px;
    color: #676767;

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 0.5fr;

    input {
      height: 40px;
      font-size: 1em;
      background-color: transparent;
      border: none;
      border-bottom: 2px solid black;
      width: 90%;
    }

    button {
      width: 95%;
      border: none;
      border-radius: 5px;
      color: white;
    }

    button:first-of-type {
      grid-row-start: 4;
      background-color: #d84c4ce6;
    }

    button:nth-of-type(2) {
      justify-self: end;
      background-color: #48aa48;
    }

    h1 {
      grid-column: span 2;
    }
  }
}
</style>
