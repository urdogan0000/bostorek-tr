<template>
  <section class="full-section-height">
    <div class="container">
      <form class="mt-5" @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              autocomplete="off"
              v-model.trim="formData.email"
              required
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span class="text-danger small" v-if="showEmailWarningMessage">
              Email must be valid
            </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model.trim="formData.password"
              required
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
            />
            <span class="text-danger small" v-if="showPasswordWarningMessage">
              Password must be valid
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100">Login</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { mapActions } from 'pinia'
import { useToast } from 'vue-toastification'
const toast = useToast()
export default {
  name: 'LoginView',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),
    async submitForm() {
      try {
        await this.login(this.formData)
        toast.success('you will be redirected to do Login page', {
          timeout: 2000,
          pauseOnHover: true,
          icon: 'fas fa-rocket',
          closeButton: 'button'
        })

        setTimeout(() => {
          this.$router.push('/dashboard')
        }, 3000)
      } catch (error) {
        this.errorMessage = error.message || 'Failed to login'
        toast.error(this.errorMessage)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
