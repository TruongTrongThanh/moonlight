<template>
<div id="app">
  <the-header></the-header>
  <router-view/>
</div>
</template>

<script>
const TheHeader = () => import('@/TheHeader')

export default {
  name: 'App',
  components: {
    TheHeader
  },
  mounted() {
    document.addEventListener("click", function(e) {
      if (!e.target.classList.contains('avatar-toggle') && document.querySelector('.avatar-collpase') !== null)
        document.querySelector('.avatar-collpase').classList.remove('is-active')
    })
  }
}
</script>

<style lang="scss">
@import 'assets/scss/reset';

html {
  color: white;
}

.mid-content {
  text-align: center;
}

.col-area-2 {
  grid-column: span 2;
}

.col-area-3 {
  grid-column: span 3;
}

.col-area-4 {
  grid-column: span 4;
}

.row-area-2 {
  grid-row: span 2;
}

.row-area-3 {
  grid-row: span 3;
}

.area-2 {
  grid-row: span 2;
  grid-column: span 2;
}

.area-3 {
  grid-row: span 3;
  grid-column: span 3;
}
</style>
