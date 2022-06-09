import Vue from "vue";
import App from "./App.vue";

import Carousel3d from "vue-carousel-3d";

Vue.use(Carousel3d);

export const bus = new Vue();
window.$bus = bus;

new Vue({
  el: "#app",
  render: (h) => h(App),
});
