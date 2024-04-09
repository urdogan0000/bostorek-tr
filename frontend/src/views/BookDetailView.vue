<template>
  <section style="min-height: calc(100vh - 130px); overflow: hidden">
    <div class="container" v-if="!loading">
      <SectionHeader :title="book.title" :text="book.author" />
      <font-awesome-icon
        icon="arrow-left"
        size="2xl"
        class="mb-2"
        style="cursor: pointer"
        @click="goToBackBooks"
      />
      <div class="row mb-4">
        <div class="col-lg-6">
          <img class="card-img-top" src="../../bostorek/images/b1.jpg" />
        </div>
        <div class="col-lg-6 details-wrapper">
          <p class="lead description">
            {{ book.description }}
          </p>
          <div class="mb-4">
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Page</strong></div>
              <div class="col-lg-6">{{ book.pageNumber }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Category</strong></div>
              <div class="col-lg-6">Fiction</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Rating</strong></div>
              <div class="col-lg-6">{{ book.rating }}</div>
            </div>
            <div class="row border-bottom pb-2">
              <div class="col-lg-6"><strong>Upload Date</strong></div>
              <div class="col-lg-6">{{ book.updatedAt }}</div>
            </div>
            <div class="mt-4 comments-section">
              <h3 class="display-6 mb-2">Comments</h3>
              <div class="card mb-4">
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, reiciendis!
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fst-italic">John Doe</p>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" />
                      <p class="mb-0 ps-2"><strong>8</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, reiciendis!
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fst-italic">John Doe</p>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" />
                      <p class="mb-0 ps-2"><strong>8</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, reiciendis!
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fst-italic">John Doe</p>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" />
                      <p class="mb-0 ps-2"><strong>8</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, reiciendis!
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fst-italic">John Doe</p>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" />
                      <p class="mb-0 ps-2"><strong>8</strong></p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-body">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, reiciendis!
                  </p>
                  <div class="d-flex justify-content-between">
                    <p class="fw-bold fst-italic">John Doe</p>
                    <div class="d-flex align-items-center">
                      <font-awesome-icon :icon="['far', 'thumbs-up']" />
                      <p class="mb-0 ps-2"><strong>8</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <p>Book Detail Loading</p>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'

export default {
  name: 'BookDetailView',
  components: {
    SectionHeader
  },
  data() {
    return {
      book: null,
      loading:true
    }
  },
  async created() {
    this.fetchAbook()
    // const bookId = this.$route.params.id

    // this.book = books.find((book) => book.id == bookId)
  },
  methods: {
    goToBackBooks() {
      this.$router.push({ name: 'books' })
    },
    async fetchAbook() {
      const bookId = this.$route.params.id
      try {
        const response = await fetch('http://localhost:3000/v1/books/' + bookId)
        const data = await response.json()
        this.book = data
        this.loading=false
        console.log(this.book);
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.details-wrapper {
  max-height: 250px;
  display: flex;
  flex-direction: column;
}
.comments-section {
  flex-grow: 1;
  max-height: 740px;
  overflow-y: auto;
}
.description {
  min-height: 150px;
  max-height: 250px;
  overflow-y: auto;
}
</style>
