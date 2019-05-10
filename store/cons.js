import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _cons: [],
});

export const getters = {
  cons: ({ _cons }) => _cons.map(con => {
    return { ...con, id: con['.key'] };
  }),
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, ref) => {
    await bindFirebaseRef('_cons', ref);
  }),
};
