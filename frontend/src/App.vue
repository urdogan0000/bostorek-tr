<template>
  <NavBar />
  <RouterView />
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {}
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mulish:ital@0;1&display=swap');
</style>
