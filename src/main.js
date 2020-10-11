import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Snotify, { SnotifyPosition } from "vue-snotify";

const options = {
  toast: {
    position: SnotifyPosition.rightBottom,
    type: "simple",
    timeout: 30000,
    showProgressBar: true,
    closeOnClick: false,
    animation: {
      enter: "jackInTheBox",
      exit: "jackInTheBox"
    },
    pauseOnHover: false
  }
};
Vue.config.productionTip = false;
Vue.use(Snotify, options);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
