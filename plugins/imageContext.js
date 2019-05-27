import Vue from 'vue';

Vue.prototype.$image = (path) => {
  if (!path) return null;
  return require.context('~/assets/images')(`./${path}`);
};
Vue.prototype.$backgroundImage = path => ({ backgroundImage: `url(${Vue.prototype.$image(path)})` });
