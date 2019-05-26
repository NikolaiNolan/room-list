import isAfter from 'date-fns/isAfter';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { firebaseAction } from 'vuexfire';

export const state = () => ({
  cons: {},
});

export const getters = {
  cons: ({ cons }) => sortBy(
    map(cons, (con, id) => ({ ...con, id }))
      .filter(({ dates }) => {
        if (isAfter(dates.start, new Date())) return true;
        return false;
      }),
  'dates.start'
  ),
  adminCons: ({ cons }) => sortBy(
    map(cons, (con, id) => ({ ...con, id })),
    'dates.start'
  ),
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('cons', app.$fireDb.ref('cons').orderByChild('dates/start').startAt(new Date().getTime()));
  }),
  adminBind: firebaseAction(async ({ bindFirebaseRef }, app) => {
    return await bindFirebaseRef('cons', app.$fireDb.ref('cons').orderByChild('dates/start'));
  }),
};
