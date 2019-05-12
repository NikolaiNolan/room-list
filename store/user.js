export const state = () => ({
  loggedIn: false,
  user: null,
  admin: false,
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn = !!loggedIn;
    if (loggedIn) return;
    state.user = null;
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
