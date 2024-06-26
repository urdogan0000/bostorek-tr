import type { BookType } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    books: [],
    isLoading: false
  }),
  getters: {
    selectedBook: (state) => {
      return (id: string) => state.books.find((book: BookType) => book._id === id)
    }
  },
  actions: {
    async fetchBooks() {
      this.isLoading = true

      try {
        const response = await axios.get('http://localhost:3000/v1/books')
        this.books = response.data
      } catch (error) {
        console.log('error fetching books', error)
      } finally {
        this.isLoading = false
      }
    },

    async addBooks(addBookDto: any) {
      try {
        const response = await axios.post('http://localhost:3000/v1/books', addBookDto)
        this.books.push(response.data as BookType as never)
        return response.data
      } catch (error) {
        console.log('error at at new books', error)
      }
    }
  }
})
