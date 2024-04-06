import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

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