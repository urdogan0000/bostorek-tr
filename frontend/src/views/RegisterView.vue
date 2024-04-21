<template>
  <section class="full-section-height">
    <div class="container">
      <div class="d-flex justify-content-center">
        <h1 class="display-3">Register</h1>
      </div>
      <form class="mt-5" @submit.prevent="submitForm">
        <div class="row justify-content-center">
          <div class="col-md-7 col-8 mb-3">
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
            <span class="text-danger small" v-if="showUsernameWarningMessage && !isUserNameValid">
              Username must be between 5 and 20 characters
            </span>
          </div>

          <div class="col-md-7 col-8 mb-3">
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

          <div class="col-md-7 col-8 mb-3">
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

          <div class="col-md-7 col-8 mb-3">
            <button type="submit" class="btn btn-primary w-100" :disabled="!isFormValid || loading">
              Register
            </button>
            <span class="text-danger" v-if="!isFormValid">* Please complete the field</span>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  username: '',
  email: '',
  password: ''
})
const toast = useToast()

const showUsernameWarningMessage = ref(false)
const showEmailWarningMessage = ref(false)
const showPasswordWarningMessage = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const isUserNameValid = computed(
  () => formData.username.length >= 5 && formData.username.length <= 20
)
const isEmailValid = computed(() =>
  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
)
const isPasswordValid = computed(() => formData.password.length >= 5) // Adjust this condition for better security
const isFormValid = computed(
  () => isUserNameValid.value && isEmailValid.value && isPasswordValid.value
)

async function submitForm() {
  if (!isFormValid.value) return
  loading.value = true
  try {
    await authStore.register(formData)
    toast.success('you will be redirected to do Login page', {
      timeout: 2000,
      pauseOnHover: true,
      icon: 'fas fa-rocket',
      closeButton: 'button'
    })

    setTimeout(() => {
      router.push('/login')
    }, 4000)
  } catch (error) {
    errorMessage.value = error.message || 'Failed to register. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>

</style>
