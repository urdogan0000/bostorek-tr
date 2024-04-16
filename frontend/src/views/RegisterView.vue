<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>
      <form class="mt-5" @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <!-- Username Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <label for="username" class="form-label">Username</label>
            <span class="text-danger">*</span>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model.trim="formData.username"
              autocomplete="off"
              :class="{
                'is-valid': isUserNameValid,
                'is-invalid': !isUserNameValid && showUsernameWarningMessage
              }"
              @focus="showUsernameWarningMessage = true"
              @blur="showUsernameWarningMessage = false"
              required
            />
            <span class="text-danger small" v-if="showUsernameWarningMessage && !isUserNameValid"
              >Username must be between 5 and 20 char</span
            >
          </div>
        </div>

        <div class="row justify-content-center">
          <!-- Email Field (Medium and Larger Screens) -->
          <div class="col-md-6 col-8 mb-3">
            <label for="email" class="form-label">Email</label>
            <span class="text-danger">*</span>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              autocomplete="off"
              v-model.trim="formData.email"
              required
              :class="{
                'is-valid': isEmailValid,
                'is-invalid': !isEmailValid && showEmailWarningMessage
              }"
              @focus="showEmailWarningMessage = true"
              @blur="showEmailWarningMessage = false"
            />
            <span class="text-danger small" v-if="showEmailWarningMessage && !isEmailValid">
              Email must be valid
            </span>
          </div>
        </div>

        <!-- Password Field -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <label for="password" class="form-label">Password</label>
            <span class="text-danger">*</span>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              v-model.trim="formData.password"
              required
              :class="{
                'is-valid': isPasswordValid,
                'is-invalid': !isPasswordValid && showPasswordWarningMessage
              }"
              @focus="showPasswordWarningMessage = true"
              @blur="showPasswordWarningMessage = false"
            />
            <span class="text-danger small" v-if="showPasswordWarningMessage && !isPasswordValid">
              Password must be valid
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="row justify-content-center">
          <div class="col-md-6 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100" :disabled="!isFormValid || loading">
              Register
            </button>
            <span class="text-danger" v-if="!isFormValid">* Please completE the field</span>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/authStore'
import { mapActions } from 'pinia'
export default {
  name: 'RegisterView',
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: ''
      },
      showUsernameWarningMessage: false,
      showEmailWarningMessage: false,
      showPasswordWarningMessage: false,
      loading: false,
      errorMessage: ''
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['register']),
    async submitForm() {
      try {
        this.loading = true
        console.log(this.formData)
        await this.register(this.formData)
        this.$router.push('/login')
      } catch (error) {
        this.errorMessage = error.message || 'Failed to register. Please try again.'
      } finally {
        this.loading = false
      }
    }
  },
  computed: {
    isFormValid() {
      return this.isEmailValid && this.isUserNameValid && this.isPasswordValid
    },
    isUserNameValid() {
      return this.formData.username.length >= 5 && this.formData.username.length <= 20
    },
    isEmailValid() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      return emailRegex.test(this.formData.email)
    },
    isPasswordValid() {
      return this.formData.password.length >= 5 // Example: at least 8 characters
    }
  }
}
</script>

<style scoped>
.form-control {
  border-radius: 25px;
  height: 48px;
}
.form-control:focus {
  box-shadow: none;
}

.btn-primary {
  border-radius: 25px;
  height: 45px;
  background-color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
}
.btn:hover {
  background-color: aliceblue;
  color: var(--secondary-color);
  transition: all 0.3s ease;
}
</style>
