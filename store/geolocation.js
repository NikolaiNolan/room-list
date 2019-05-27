export const state = () => ({
  location: null,
});

export const mutations = {
  setLocation(currentState, location) {
    currentState.location = location;
  },
};

export const actions = {
  bind: async ({ commit }) => {
    const { coords: { latitude: lat, longitude: lng } } = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    commit('setLocation', { lat, lng });
  },
};
