import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import Toast, { type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useBookStore } from '@/stores/bookStore'
import { useAuthStore } from '@/stores/authStore'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowLeft, faThumbsUp)
const options:PluginOptions = {
  
};


const pinia = createPinia()

const storedUser = localStorage.getItem('user')
if (storedUser) {
  const userData = JSON.parse(storedUser)
  useAuthStore(pinia).user = userData
}

const bookStore = useBookStore(pinia)

bookStore.fetchBooks().then(() => {
  const app = createApp(App)
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(pinia).use(router)
  app.use(Toast, options);
  app.mount('#app')
})

/*const app= createApp({
    data(){
        return {
            name:"Haydar"
        }
    },
    template:`<h1>{{name}}</h1> `
});

app.mount("#app")*/
