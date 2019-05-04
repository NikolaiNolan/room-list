export const state = () => ({
  loggedIn: false,
  user: null,
  admin: false,
})

export const mutations = {
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
  },
}
