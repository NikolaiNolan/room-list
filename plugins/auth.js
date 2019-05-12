export default {
  methods: {
    async login() {
      await this.$fireAuth.setPersistence(this.$fireAuthObj.Auth.Persistence.LOCAL);
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      this.$fireAuth.signInWithRedirect(provider);
    },
    async logout() {
      await this.$fireAuth.signOut();
      this.$store.commit('user/setUser', null);
    }
  }
}
