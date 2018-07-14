<template>
  <div class="the-header navbar">
    <div class="navbar-brand">
      <img class="logo" :src="require('Assets/brand.svg')"/>
    </div>
    <div class="mobile-only">
      <div class="navbar-item search-box">
        <input type="text" placeholder="Search..."/><font-icon width=16 icon="search"/>
      </div>
    </div>
    <div @click="toggle" class="navbar-toggle mobile-only">
      |||
    </div>
    <div ref="menuList" class="navbar-list desktop-only">
      <div class="navbar-start">
        <div class="navbar-item">Genre</div>
        <div class="navbar-item">Author</div>
        <div class="navbar-item search-box desktop-only">
          <input type="text" placeholder="Search..."/><font-icon width=20 icon="search"/>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">User</div>
        <div class="navbar-item">Login</div>
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
    toggle() {
      const menuList = this.$refs.menuList
      if (menuList.classList.contains('desktop-only'))
        menuList.classList.remove('desktop-only')
      else
        menuList.classList.add('desktop-only')
    },

    logout() {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push({ name: 'Home' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  display: grid;
  background-color: white;
  height: 60px;
  color: black;
  margin-bottom: 20px;

  grid-template-columns: 1fr 4fr 1fr;
  align-items: center;

  .navbar-brand {
    max-height: 60px;
    text-align: center;
  
    .logo {
      height: 60px;
      transform: scale(0.65, 0.65);
    }

    .search-box {
      display: inline-block;
    }
  }

  .navbar-toggle {
      justify-self: center;
      cursor: pointer;
    }

  .navbar-item.search-box {
    position: relative;
    input {
      outline: 0;
      border-radius: 20px;
      height: 35px;
      width: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      border: 1px solid rgba(0, 0, 0, 0.37);
      font-size: 15px;
    }

    .fa-search {
      position: absolute;
      top: 9px;
      right: 11px;
      transform: scale(1.2, 1.2);
      color: rgba(0, 0, 0, 0.37);
    }

    input:focus {
      //border: 2px solid #0009;
      box-shadow: 0 0 10px #0009;
    }

    input {
      justify-self: end;
    }
  }

  .navbar-list {
    z-index: 1;
    grid-column: span 3;

    .navbar-item {
      display: block;
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.89);
    }
  }
}

@media screen and (min-width: 768px) {
  .navbar {
    grid-template-columns: 7% 1fr;

    .navbar-brand {
      max-height: 60px;

      .logo {
        height: 60px;
        transform: scale(0.88, 0.88);
      }
    }

    .navbar-list {
      display: grid;
      grid-template-columns: 7fr 5fr;
      grid-column: span 1;
      align-items: center;
      
      .navbar-item {
        display: inline-block;
        font-size: 1.2em;

        .fa-search {
          top: 18px;
          right: 25px;
          transform: scale(0.95, 0.95);
        }
      }

      .navbar-start {
        display: grid;
        grid-template-columns: 1fr 1fr 7fr;
        align-items: center;
        justify-items: center;

        .navbar-item.search-box {
          width: 95%;
        }
      }

      .navbar-end {
        justify-self: end;
      }
    }
  }
}
</style>
