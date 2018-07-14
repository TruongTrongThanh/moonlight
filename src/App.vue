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
@import 'assets/scss/reset';

html {
  color: white;
}

@media only screen and (min-width: 768px) {
  .mobile-only {
    display: none !important;
  }
}

@media only screen and (max-width: 768px) {
  .desktop-only {
    display: none !important;
  }
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
