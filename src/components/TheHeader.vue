<template>
  <div class="the-header">
    <router-link tag="div" :to="{name: 'Home'}" class="brand"><img height="45" :src="require('Assets/brand.svg')"/></router-link>
    <div @click.prevent="toggleDropdown" class="toggle"><img height="40" :src="require('Assets/menu.svg')"/></div>
    <div ref="dropdown" class="dropdown">
      <router-link :to="{name: 'Register'}" class="header-item" tag="div">Manga</router-link>
      <div class="header-item">Visual Novel</div>
      <router-link v-if="!currentUser" class="header-item divine" :to="{name: 'Register'}" tag='div'>
        Register
        <img height="21" :src="require('Assets/clipboard-with-pencil-.svg')"/>
      </router-link>
      <router-link v-if="!currentUser" class="header-item" :to="{name: 'Login'}" tag='div'>
        Login
        <img height="21" :src="require('Assets/login.svg')"/>
      </router-link>
      <div v-if="currentUser" @click="logout" class="header-item divine">Logout</div>
      <div v-if="currentUser" class="header-item">{{ currentUser.username }}</div>
      <div class="header-item search-box">
        <input type="text"/>
        <img height="20" :src="require('Assets/magnifier.svg')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  computed: {
    currentUser() {
      return this.$store.state.currentUser
    }
  },
  methods: {
    toggleDropdown() {
      const dropdownElement = this.$refs['dropdown']
      if (dropdownElement.classList.contains('expand'))
        dropdownElement.classList.remove('expand')
      else
        dropdownElement.classList.add('expand')
    },
    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  },
  beforeRouteLeave(to, from, next)  {
    this.toggleDropdown()
    next()
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Bitter');

  .the-header {
    height: 57px;
    width: 100%;
    background-color: #676767;
    position: sticky;
    top: 0;
    display: inline-grid;
    font-family: 'Bitter', serif;

    .brand {
      cursor: pointer;
    }

    .header-item {
      cursor: pointer;
      img {
        position: relative;
        top: 4px;
      }
    }

    .header-item.search-box {
      cursor: auto;
      input {
        height: 25px;
      }
      img {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 768px) {
    .the-header {
      grid-template-columns: 25% 1fr 25%;
      align-items: center;

      .brand {
        text-align: center;
      }

      .dropdown {
        display: none;
      }

      .toggle {
        display: inline-block;
        text-align: center;
        grid-column-start: 3;
        cursor: pointer;
      }
    }
    .dropdown.expand {
      display: inline-grid;
      position: absolute;
      top: 0;
      margin-top: 57px;
      align-items: center;
      width: 100%;

      .header-item {
        padding: 15px 17px;
        display: block;
        text-align: center;
      }

      .header-item:nth-child(even) {
        background-color: #676767;
      }
      .header-item:nth-child(odd) {
        background-color: #4e4e4e;
      }

      .header-item.search-box {
        input {
          width: 80%;
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    .the-header {
      grid-template-columns: 7% 93%;

      .header-item {
        text-align: center;
        height: 100%;
        line-height: 57px;
      }

      .brand {
        text-align: center;

        img {
          position: relative;
          top: 3px;
        }
      }

      .toggle {
        display: none;
      }

      .dropdown {
        display: inline-grid;
        grid-template-columns: 8% 8% 1fr 8% 8% 20%;

        .header-item.divine {
          grid-column-start: 4;
        }

        .header-item.search-box {
          input {
            width: 200px;
          }
        }
      }
    }
  }

</style>
