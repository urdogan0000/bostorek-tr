<template>
  <section style="min-height: calc(100vh - 130px)">
    <div class="container py-5">
      <ul class="nav nav-tabs" id="dashboardTab" role="tablist">
        <li class="nav-item" role="presentation" @click="activeTab = 'general'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'general' }"
            id="general-tab"
            data-bs-toggle="tab"
            data-bs-target="#general-tab-pane"
            type="button"
            role="tab"
            aria-controls="general-tab-pane"
            aria-selected="true"
          >
            General
          </button>
        </li>
        <li class="nav-item" role="presentation" @click="activeTab = 'books'">
          <button
            class="nav-link"
            :class="{ active: activeTab === 'books' }"
            id="books-tab"
            data-bs-toggle="tab"
            data-bs-target="#books-tab-pane"
            type="button"
            role="tab"
            aria-controls="books-tab-pane"
            aria-selected="false"
          >
            Books
          </button>
        </li>
      </ul>
      <div class="tab-content py-4" id="dashboardContent">
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'general' }"
          id="general-tab-pane"
          role="tabpanel"
          aria-labelledby="general-tab"
          tabindex="0"
        >
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
        </div>
        <div
          class="tab-pane fade"
          :class="{ 'active show': activeTab === 'books' }"
          id="books-tab-pane"
          role="tabpanel"
          aria-labelledby="books-tab"
          tabindex="0"
        >
          {{ user }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const { user } = useAuthStore()
const activeTab = ref('general')
const editMode = ref(false)
const userInfo = reactive({
  username: '',
  email: '',
  password: ''
})

function toggleEditMode() {
  editMode.value = !editMode.value
}

function saveUserInfo() {
  // Implement API call or store action to save userInfo
  console.log('Saving user info:', userInfo)
  // Reset edit mode and clear sensitive data like password after save
  editMode.value = false
  userInfo.password = ''
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

<style scoped>
.nav-link {
  color: var(--secondary-color);
  font-weight: bold;
}

.nav-tabs {
  border-color: var(--secondary-color);
}

.nav-link.active {
  color: var(--primary-color);
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}
</style>
