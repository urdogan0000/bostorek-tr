import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  actions: {
    async updateUser(id: string, newUserData: any) {
      try {
        console.log('newUserData', newUserData)

        const response = await axios.patch(`http://localhost:3000/v1/user/${id}`, newUserData)
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
    }
  }
})
