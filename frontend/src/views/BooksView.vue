<template>
  <section>
    <div class="container">
      <SectionHeader
        title="Books"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It"
      />

      <BookList :books="paginatedBooks" />
      <PaginationComp :currentPage="currentPage" :totalPages="totalPages" @page-changed="updatePage" />
    </div>
  </section>
</template>

<script>
import BookList from '@/components/BookList.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import PaginationComp from '@/components/Pagination.vue'
import books from '@/db'

export default {
  name: 'BookView',
  components: {
    SectionHeader,
    BookList,
    PaginationComp
  },
  data() {
    return {
      books: books,
      currentPage: 1,
      itemPerPage: 8
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.books.length / this.itemPerPage)
    },
    paginatedBooks() {
      const startIndex = (this.currentPage - 1) * this.itemPerPage;
      const endIndex = startIndex + this.itemPerPage;
      return this.books.slice(startIndex,endIndex)
    }
  },
  methods:{
    updatePage(page){
        this.currentPage = page
    }
  }
}
</script>

<style scoped>
.auth-box {
  margin-top: -30px;
}
</style>
