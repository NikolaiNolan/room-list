export const state = () => ({
  loggedIn: false,
  user: {},
  admin: false,
});

export const mutations = {
  setLoggedIn(currentState, loggedIn) {
    currentState.loggedIn = !!loggedIn;
    if (loggedIn) return;
    currentState.user = {};
    currentState.admin = false;
  },
  setUser(currentState, user) {
    currentState.user = user;
  },
  updateUser(currentState, user) {
    currentState.user = { ...currentState.user, ...user };
  },
  setAdmin(currentState, admin) {
    currentState.admin = admin;
  },
};

export const actions = {
  bind: async ({ commit }, app) => {
    app.$fireAuth.onAuthStateChanged(async (user) => {
      commit('setLoggedIn', user);
      if (!user) return;
      commit('updateUser', {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        picture: user.photoURL,
      });
      const userSnapshot = await app.$fireDb.ref(`users/${user.uid}`).once('value');
      const userProfile = userSnapshot.val();
      commit('setAdmin', userProfile.admin);
      commit('updateUser', userProfile);
    });
  },
};
