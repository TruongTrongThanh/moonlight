<template>
  <div class="the-header navbar">
    <div class="navbar-brand">
      <router-link tag="img" :to="{ name: 'Home' }" class="logo" :src="require('Assets/brand.svg')"></router-link>
    </div>
    <div class="navbar-mobile-list">
      <div class="search-box">
        <input type="text" placeholder="Search..."/><font-icon width=16 icon="search"/>
      </div>
    </div>
    <div @click="menuToggle" class="navbar-toggle">
      <font-icon width=16 icon="bars"/>
    </div>
    <div ref="menuList" class="navbar-desktop-list is-close">
      <div class="navbar-start">
        <div class="navbar-item">Genre</div>
        <div class="navbar-item">Author</div>
        <div class="navbar-item search-box desktop-only">
          <input type="text" placeholder="Search..."/><font-icon width=20 icon="search"/>
        </div>
      </div>
      <div v-if="currentUser" class="navbar-end">
        <div class="navbar-item avatar">
          <img @click="avatarToggle" class="avatar-toggle" width=35 :src="require('Assets/noAvatar.png')"/>
          <ul ref="avatarCollapse" class="avatar-collpase">
            <li>My manga</li>
            <router-link tag="li" :to="{ name: 'MangaUpload' }">Upload manga</router-link>
            <li>Setting</li>
            <li @click="logout">Logout</li>
          </ul>
        </div>
        <div class="navbar-item">{{ currentUser.username }}</div>
      </div>
      <div v-else class="navbar-end">
        <router-link :to="{ name: 'Login' }" class="navbar-item">Login <font-icon width=16 icon="sign-in-alt"/></router-link>
        <router-link :to="{ name: 'Register' }" class="navbar-item">Register <font-icon width=16 icon="sign-in-alt"/></router-link>
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
    menuToggle() {
      const menuList = this.$refs.menuList
      if (menuList.classList.contains('is-open')) {
        menuList.classList.remove('is-open')
        menuList.classList.add('is-close')
      }
      else {
        menuList.classList.remove('is-close')
        menuList.classList.add('is-open')
      }
    },
    avatarToggle() {
      console.log('avatar toggle')
      const avaColl = this.$refs.avatarCollapse
      if (avaColl.classList.contains('is-active'))
        avaColl.classList.remove('is-active')
      else
        avaColl.classList.add('is-active')
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
@import '../assets/scss/navbar';

.navbar-item {
  > svg {
    position: relative;
    top: 3px;
  }

  &.avatar {
    padding: 0 !important;
    position: relative;
    cursor: pointer;

    .avatar-collpase {
      position: absolute;
      width: 150px;
      background-color: white;
      left: -58px;
      border: 1px solid black;

      li {
        display: block;
        //@include user-select(none);
        border-bottom: 1px solid black;
        text-align: center;
        padding: 10px;
      }

      display: none;
      &.is-active {
        display: block;
      }
    }

    img {
      border-radius: 20px;
    }
  }
}

.search-box {
  position: relative;
  display: inline-block;
  width: 95%;
  input {
    border-radius: 20px;
    height: 35px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    border: 1px solid rgba(0, 0, 0, 0.37);
    font-size: 15px;

    &:focus {
      //border: 2px solid #0009;
      box-shadow: 0 0 10px #0009;
    }
  }

  .fa-search {
    position: absolute;
    color: rgba(0, 0, 0, 0.37);

    top: 9px;
    right: 11px;
    transform: scale(1.2, 1.2);

    @include for-tablet-portrait-up {
      top: 18px;
      right: 25px;
      transform: scale(0.95, 0.95);
    }
  } 
}
</style>
