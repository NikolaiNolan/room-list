export default {
  methods: {
    async login() {
      await this.$fireAuth.setPersistence(this.$fireAuthObj.Auth.Persistence.LOCAL);
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      const { user: { uid }, additionalUserInfo: { profile }} = await this.$fireAuth.signInWithRedirect(provider);
      this.$fireDb.ref('users').update({ [uid]: profile });
    },
    async logout() {
      await this.$fireAuth.signOut();
      this.$store.commit('user', null);
    }
  }
}
