import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _roomMax: {},
  _suiteMax: {},
});

export const getters = {
  roomMax: ({ _roomMax }) => _roomMax['.value'],
  suiteMax: ({ _suiteMax }) => _suiteMax['.value'],
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, db) => {
    await Promise.all([
      bindFirebaseRef('_roomMax', db.ref('config/roomMax')),
      bindFirebaseRef('_suiteMax', db.ref('config/suiteMax')),
    ]);
  }),
};
