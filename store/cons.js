import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _cons: [],
});

export const getters = {
  cons: ({ _cons }) => _cons.map(con => {
    return { ...con, id: con['.key'] };
  }),
};

export const mutations = {
  set: (state, cons) => state._cons = cons,
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, context) => {
    const app = context.app || context;
    await bindFirebaseRef('_cons', app.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()));
  }),
  ssrBind: async ({ commit }, { app }) => {
    const snapshot = await app.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()).once('value');
    const orderedCons = [];
    snapshot.forEach((con) => {
      orderedCons.push({ ...con.val(), '.key': con.key });
    });
    return commit('set', orderedCons);
  },
};
