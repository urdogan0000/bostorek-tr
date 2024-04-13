import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useBookStore } from './stores/bookStore'
import { mapActions } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

/* import specific icons */
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowLeft, faThumbsUp)

const pinia = createPinia()

const bookStore = useBookStore(pinia)

bookStore.fetchBooks().then(() => {
  const app = createApp(App)
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.use(pinia).use(router)

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
