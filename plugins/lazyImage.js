import Vue from "vue";
import { VLazyImagePlugin } from "v-lazy-image";

Vue.use(VLazyImagePlugin);

Vue.prototype.$intersectionOptions = {
  rootMargin: '50%',
};

Vue.prototype.$placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E";
