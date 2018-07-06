<template>
  <div id="app">
    <the-header></the-header>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from '@/TheHeader'

export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style lang="scss">
  html {
    color: white;
  }
</style>

