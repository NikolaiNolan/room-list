import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _config: {},
});

export const getters = {
  exchange: ({ _config }) => _config.exchange,
  gasCost: ({ _config }) => _config.gasCost,
  mpg: ({ _config }) => _config.mpg,
  roomMax: ({ _config }) => _config.roomMax,
  suiteMax: ({ _config }) => _config.suiteMax,
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('_config', app.$fireDb.ref('config'));
  }),
};
