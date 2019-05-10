import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _roomMax: {},
  _suiteMax: {},
});

export const getters = {
  roomMax: ({ _roomMax }) => _roomMax['.value'],
  suiteMax: ({ _suiteMax }) => _suiteMax['.value'],
};

export const mutations = {
  setRoomMax: (state, roomMax) => state._roomMax = { '.value': roomMax },
  setSuiteMax: (state, suiteMax) => state._suiteMax = { '.value': suiteMax },
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, context) => {
    const app = context.app || context;
    await Promise.all([
      bindFirebaseRef('_roomMax', app.$fireDb.ref('config/roomMax')),
      bindFirebaseRef('_suiteMax', app.$fireDb.ref('config/suiteMax')),
    ]);
  }),
  ssrBindRoomMax: async ({ commit }, { app }) => {
    const snapshot = await app.$fireDb.ref('config/roomMax').once('value');
    return commit('setRoomMax', snapshot.val());
  },
  ssrBindSuiteMax: async ({ commit }, { app }) => {
    const snapshot = await app.$fireDb.ref('config/suiteMax').once('value');
    return commit('setSuiteMax', snapshot.val());
  },
};
