import { firebaseMutations } from 'vuexfire';

export const state = () => ({
  loggedIn: false,
  user: null,
  admin: false,
})

export const mutations = {
  ...firebaseMutations,
  loggedIn(state, loggedIn) {
    state.loggedIn = !!loggedIn;
    if (loggedIn) return;
    state.user = null;
    state.admin = false;
  },
  user(state, user) {
    state.user = user;
  },
  admin(state, admin) {
    state.admin = admin;
  }
}

export const actions = {
  async addPerson({ state }, { conId, roomId, options }) {
    const personId = state.user.id;
    const userSnapshot = await this.$fireDb.ref(`users/${personId}`).once('value');
    const { familyName, givenName, picture } = userSnapshot.val();
    this.$fireDb.ref(`cons/${conId}/people/${roomId}/${personId}`).update({
      givenName,
      familyInitial: familyName[0],
      picture,
      ...options,
    });
  },
  async movePerson({ state }, { conId, fromRoomId, toRoomId }) {
    const personId = state.user.id;
    const userSnapshot = await this.$fireDb.ref(`cons/${conId}/people/${fromRoomId}/${personId}`).once('value');
    const options = userSnapshot.val();
    this.$fireDb.ref(`cons/${conId}/people/${toRoomId}/${personId}`).update(options);
    this.$fireDb.ref(`cons/${conId}/people/${fromRoomId}/${personId}`).remove();
  },
  removePerson(context, { conId, roomId, personId }) {
    this.$fireDb.ref(`cons/${conId}/people/${roomId}/${personId}`).remove();
  },
  async nuxtServerInit({ dispatch }, context) {
    return await Promise.all([
      dispatch('cons/ssrBind', context),
      dispatch('config/ssrBindRoomMax', context),
      dispatch('config/ssrBindSuiteMax', context),
    ]);
  },
};
