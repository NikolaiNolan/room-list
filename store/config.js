import { firebaseAction } from 'vuexfire';

export const state = () => ({
  config: {},
});

export const getters = {
  dailyTip: ({ config }) => config && config.dailyTip,
  exchange: ({ config }) => config && config.exchange,
  gasCost: ({ config }) => config && config.gasCost,
  mpg: ({ config }) => config && config.mpg,
  roomMax: ({ config }) => config && config.roomMax,
  suiteMax: ({ config }) => config && config.suiteMax,
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('config', app.$fireDb.ref('config'));
  }),
};
