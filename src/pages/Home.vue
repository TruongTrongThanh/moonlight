<template>
  <div class="home">
    My Home.
  </div>
</template>

<script>
export default {
  name: 'Home',
  title() {
    return 'Moonlight'
  },
  asyncData({ store, router }) {
    const payload = {
      page: 1,
      limit: 30
    }
    console.log('Home tracking --------------------------------------------------------')
    return 1
  },
  computed: {
    mangaList() {
      return this.$store.state.mangaList
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
