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
      } catch (error) {
        console.log('error at getting user', error)
      }
    },

    async login(loginData: any) {
      try {
        console.log('newUserData', loginData)

        const response = await axios.post('http://localhost:3000/v1/user/login', loginData)
        this.user = response.data.user.user
        console.log(response)
        localStorage.setItem('user', JSON.stringify(response.data.user.user))
      } catch (error) {
        console.log('error at getting user', error)
      }
    }
  }
})
