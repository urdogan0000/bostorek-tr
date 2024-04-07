<template>
  <section>
    <div class="container">
      <SectionHeader
        title="Books"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It"
      />

      <BookList  :books="books"/>
    </div>
  </section>
</template>

<script>
import BookList from '@/components/BookList.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import books from '@/db'

export default {
  name: 'BookView',
  components: {
    SectionHeader,
    BookList
  },
  data() {
    return {
        books:books
    }
  }
}
</script>

<style scoped>
.auth-box {
  margin-top: -30px;
}
</style>
