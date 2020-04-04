import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import Vue2TouchEvents from "vue2-touch-events";
import "buefy/dist/buefy.css";

Vue.use(Vue2TouchEvents);
Vue.use(Buefy);

new Vue({
  render: h => h(App)
}).$mount("#app");
