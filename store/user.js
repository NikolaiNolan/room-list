export const state = () => ({
  loggedIn: false,
  user: {},
  admin: false,
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn = !!loggedIn;
    if (loggedIn) return;
    state.user = {};
    state.admin = false;
  },
  setUser(state, user) {
    state.user = user;
  },
  updateUser(state, user) {
    state.user = { ...state.user, ...user };
  },
  setAdmin(state, admin) {
    state.admin = admin;
  }
}

export const actions = {
  bind: async ({ commit }, app) => {
    app.$fireAuth.onAuthStateChanged(async user => {
      commit('setLoggedIn', user);
      if (!user) return;
      commit('updateUser', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
      commit('setAdmin', user.uid === 'LK7Jn91OK8NgXpBmttGCz2u5cPg2');
      const userSnapshot = await app.$fireDb.ref(`users/${user.uid}`).once('value');
      commit('updateUser', userSnapshot.val());
    });
  },
};
