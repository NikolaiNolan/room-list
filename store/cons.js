import addYears from 'date-fns/addYears';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import subDays from 'date-fns/subDays';
import subWeeks from 'date-fns/subWeeks';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import { firebaseAction } from 'vuexfire';

export const state = () => ({
  cons: {},
});

export const getters = {
  futureCons: ({ cons }) => sortBy(
    map(cons, (con, id) => ({ ...con, id }))
      .filter(({ dates }) => {
        if (dates.end) {
          if (isBefore(dates.end, subDays(new Date(), 1))) return false;
        } else if (isBefore(dates.start, new Date())) return false;
        if (isAfter(dates.end, addYears(new Date(), 1))) return false;
        return true;
      }),
    'dates.start',
  ),
  allCons: ({ cons }) => sortBy(
    map(cons, (con, id) => ({ ...con, id })),
    'dates.start',
  ),
};

export const actions = {
  bind: firebaseAction(async ({ bindFirebaseRef }, app) => bindFirebaseRef(
    'cons',
    app.$fireDb.ref('cons').orderByChild('dates/start').startAt(subWeeks(new Date(), 1).getTime()),
  )),
  bindAll: firebaseAction(async ({ bindFirebaseRef }, app) => bindFirebaseRef('cons', app.$fireDb.ref('cons'))),
};
