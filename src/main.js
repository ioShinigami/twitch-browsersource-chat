import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.use(Toast, {
  transition: "Vue-Toastification__fade",
  maxToasts: 10,
  newestOnTop: true
});
new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
