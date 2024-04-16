<template>
  <h1>{{ user }}</h1>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { mapState } from 'pinia'
export default {
  name: 'DashBoardView',
  components: {},
  methods: {},
  computed: {
    ...mapState(useAuthStore, ['user'])
  }
}
</script>

<style lang="scss" scoped></style>
