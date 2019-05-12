import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { firebaseAction } from 'vuexfire';

export const state = () => ({
  _cons: {},
});

export const getters = {
  cons: ({ _cons }) => sortBy(
    map(_cons, (con, id) => ({ ...con, id })),
    'dates.start'
  ),
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('_cons', app.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()));
  }),
};
