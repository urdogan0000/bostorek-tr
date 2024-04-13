<template>
  <section>
    <CarouselWidget :items="carouselItems" :height="'400px'" />
  </section>
  <section class="my-5" style="margin-bottom: 200px !important">
    <div class="container">
      <SectionHeader
        title="Featured Books"
        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It"
      />
      <div class="row">
        <div class="col-md-4">
          <div class="list-group">
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'latest' }"
              @click="changeSelectFilter('latest')"
            >
              Latest Books
            </button>
            <button
              type="button"
              class="list-group-item list-group-item-action"
              :class="{ active: selectedFilter === 'best' }"
              @click="changeSelectFilter('best')"
            >
              Best Ratings
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <SpinnerWidget v-if="isLoading" />
          <div v-else class="accordion">
            <div class="accordion-item" v-for="(book, index) in filteredBooks" :key="index">
              <h2 class="accordion-header">
                <button
                  class="accordion-button"
                  type="button"
                  @click="changeSelectedItem(index)"
                  :class="{
                    collapsed: selectedItemIndex !== index
                  }"
                >
                  <strong> {{ book.title }} - {{ book.author }}</strong>
                </button>
              </h2>
              <div
                class="accordion-collapse collapse"
                :class="{ show: selectedItemIndex === index }"
              >
                <div class="accordion-body">
                  <div class="row">
                    <div class="col-md-4">
                      <img src="../assets/images/b1.jpg" class="img-fluid" />
                    </div>
                    <div class="col-md-8 d-flex flex-column justify-content-center">
                      <p>{{ book.description }}</p>
                      <div
                        class="badge align-self-start"
                        style="background-color: var(--secondary-color)"
                      >
                        {{ book.rating }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import SectionHeader from '@/components/SectionHeader.vue'
import CarouselWidget from '@/components/widgets/CarouselWidget.vue'
import SpinnerWidget from '@/components/widgets/SpinnerWidget.vue'
import hero_1 from '@/assets/images/hero_1.jpg'
import hero_2 from '@/assets/images/hero_2.jpg'
import hero_3 from '@/assets/images/hero_3.jpg'
import { useBookStore } from '@/stores/bookStore'
import { mapState } from 'pinia'

export default {
  name: 'HomeView',
  components: {
    CarouselWidget,
    SectionHeader,
    SpinnerWidget
  },
  data() {
    return {
      selectedFilter: 'latest',
      selectedItemIndex: 0,
      carouselItems: [
        {
          imageUrl: hero_1,
          subtitle: 'Liberte',
          title: 'Lorem Ipsum Dolor Sit Amet',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          imageUrl: hero_2,
          subtitle: 'Egalite',
          title: 'Excepteur Sint Occaecat Cupidatat',
          description:
            'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
          imageUrl: hero_3,
          subtitle: 'Fraternite',
          title: 'Neque Porro Quisquam Est',
          description:
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.'
        }
      ]
    }
  },
  methods: {
    changeSelectFilter(selectFilter) {
      this.selectedFilter = selectFilter
    },

    changeSelectedItem(index) {
      // This method toggles the accordion item between show and collapsed
      if (this.selectedItemIndex === index) {
        this.selectedItemIndex = -1 // Collapse the item if it's already open
      } else {
        this.selectedItemIndex = index // Open the item
      }
    }
  },

  computed: {
    ...mapState(useBookStore, ['books', 'isLoading']),
    filteredBooks() {
      const copiedBooks = [...this.books]
      if (this.selectedFilter === 'latest') {
        return copiedBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)
      } else if (this.selectedFilter === 'best') {
        return copiedBooks.sort((a, b) => b.rating - a.rating).slice(0, 4)
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
.list-group-item.active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.accordion-button {
  color: var(--primary-color);
}

.accordion-button:not(.collapsed) {
  background-color: var(--secondary-color);
  color: white;
}

.accordion-button:focus {
  outline: none;
  box-shadow: none;
}
</style>
