import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.user
    }
  },
  actions: {
    async register(newUserData: any) {
      try {
        console.log('newUserData', newUserData)

        const response = await axios.post('http://localhost:3000/v1/user/register', newUserData)
        console.log(response)

        return response.data
      } catch (error: any) {
        console.error('Error during registration:', error)

        // Check if the error structure is as expected before throwing specific parts
        if (error.response && error.response.data) {
          throw error.response.data
        } else {
          // Fallback error handling if the expected error structure is not present
          throw new Error('An unexpected error occurred during registration')
        }
      }
    },

    async login(loginData: any) {
      try {
        console.log('newUserData', loginData)

        const response = await axios.post('http://localhost:3000/v1/user/login', loginData)

        this.user = response.data.user

        localStorage.setItem('user', JSON.stringify(response.data.user.user))
      } catch (error: any) {
        console.error('Error during login:', error)

        // Check if the error structure is as expected before throwing specific parts
        if (error?.response && error?.response?.data) {
          throw error?.response?.data
        } else {
          console.log(error)

          // Fallback error handling if the expected error structure is not present
          throw new Error('An unexpected error occurred during registration')
        }
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
      location.reload()
    }
  }
})
