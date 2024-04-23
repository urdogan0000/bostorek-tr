<template>
  <div class="row">
    <div class="col-lg-6">
      <h2>User Info</h2>
      <form>
        <div class="mb-3">
          <label for="username">Username</label>
          <input
            v-model="userInfo.username"
            type="text"
            id="username"
            class="form-control"
            :disabled="!editMode"
          />
        </div>
        <div class="mb-3">
          <label for="email">Email</label>
          <input
            v-model="userInfo.email"
            type="email"
            id="email"
            class="form-control"
            :disabled="!editMode"
          />
        </div>
        <div class="mb-3">
          <label for="password">Password</label>
          <input
            v-model="userInfo.password"
            type="password"
            id="password"
            class="form-control"
            :disabled="!editMode"
          />
        </div>

        <div class="row align-items-start justify-content-start">
          <div class="col-sm-4">
            <button
              @click="!editMode ? toggleEditMode() : saveUserInfo()"
              type="button"
              class="btn btn-primary"
            >
              {{ editMode ? 'Save' : 'Edit' }}
            </button>
          </div>

          <div class="col-sm-4">
            <button
              v-show="editMode"
              style="background-color: #ecc73c !important; border-color: #ecc73c !important"
              @click="cancelEditMode"
              type="button"
              class="btn btn-primary ms-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
    <div class="col-lg-6">test</div>
  </div>
</template>

<script setup>

import { reactive, ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from 'vue-toastification'
import { useUserStore } from '@/stores/userStore'

const toast = useToast()
const { user, logout } = useAuthStore()
const { updateUser } = useUserStore()
const editMode = ref(false)
const userInfo = reactive({
  username: '',
  email: '',
  password: ''
})

function toggleEditMode() {
  editMode.value = !editMode.value
}

async function saveUserInfo() {
  try {
    // Implement API call or store action to save userInfo
    console.log('Saving user info:', userInfo)
    // Reset edit mode and clear sensitive data like password after save
    await updateUser(user._id, userInfo)
    toast.success('Please login with new Credentials,You will be redirecting to Login Page', {
      timeout: 2000,
      pauseOnHover: true,
      icon: 'fas fa-rocket',
      closeButton: 'button'
    })

    setTimeout(() => {
      logout()
    }, 2000)
  } catch (error) {
    this.errorMessage = error.message || 'Failed to login'
    toast.error(this.errorMessage)
  } finally {
    editMode.value = false
    userInfo.password = ''
  }
}

function cancelEditMode() {
  editMode.value = false
  resetUserInfo()
}

function resetUserInfo() {
  userInfo.username = user.username
  userInfo.email = user.email
  userInfo.password = '' // Clear password field specifically
}

// Reactive update to user information from the store
watch(
  user,
  (newUser) => {
    userInfo.username = newUser.username
    userInfo.email = newUser.email
    userInfo.password = '' // Clear password field on user change
  },
  { deep: true }
)

onMounted(resetUserInfo)
</script>

<style lang="scss" scoped></style>
