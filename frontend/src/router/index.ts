// Import statements for Vue Router and views
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordNormalized
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BooksView from '@/views/BooksView.vue'
import ContactView from '@/views/ContactView.vue'
import RegisterView from '@/views/RegisterView.vue'
import BookDetailView from '@/views/BookDetailView.vue'
import DasBoardView from '@/views/DasBoardView.vue'

// Route configurations
const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/books', name: 'books', component: BooksView },
  { path: '/books/:id', name: 'book-detail', component: BookDetailView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DasBoardView, meta: { requiresAuth: true } }
]

// Router instance creation
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active-link' // Ensures active link styling
})

// Authentication guard
function checkAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const requiresAuth = to.matched.some((record: RouteRecordNormalized) => record.meta.requiresAuth)
  const isLoggedIn = Boolean(localStorage.getItem('user'))

  if (requiresAuth && !isLoggedIn) {
    next({ name: 'login' })
  } else {
    next()
  }
}

router.beforeEach(checkAuth)

export default router
