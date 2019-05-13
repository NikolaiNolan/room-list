import { firebaseAction } from 'vuexfire';

export const state = () => ({
  config: {},
});

export const getters = {
  dailyTip: ({ config }) => config.dailyTip,
  exchange: ({ config }) => config.exchange,
  gasCost: ({ config }) => config.gasCost,
  mpg: ({ config }) => config.mpg,
  roomMax: ({ config }) => config.roomMax,
  suiteMax: ({ config }) => config.suiteMax,
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('config', app.$fireDb.ref('config'));
  }),
};
