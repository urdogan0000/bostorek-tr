import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


const app = createApp(App)
app.use(router)

app.mount('#app')

/*const app= createApp({
    data(){
        return {
            name:"Haydar"
        }
    },
    template:`<h1>{{name}}</h1> `
});

app.mount("#app")*/