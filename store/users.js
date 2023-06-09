import { firebaseAction } from 'vuexfire';

export const state = () => ({
  users: [],
});

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => bindFirebaseRef('users', app.$fireDb.ref('users').orderByChild('name'))),
};
