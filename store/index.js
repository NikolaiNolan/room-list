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
  removePerson(state, { conKey, roomKey, personKey }) {
    console.log(conKey, roomKey, personKey);
    this.$fireDb.ref(`people/${conKey}/${roomKey}/${personKey}`).remove();
  }
}
