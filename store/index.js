import { vuexfireMutations } from 'vuexfire';

export const mutations = vuexfireMutations;

export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    return Promise.all([
      dispatch('config/bind', app),
      dispatch('cons/bind', app),
    ]);
  },
};
