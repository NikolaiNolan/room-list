export default {
  methods: {
    async login() {
      await this.$fireAuth.setPersistence(this.$fireAuthObj.Auth.Persistence.LOCAL);
      const provider = new this.$fireAuthObj.GoogleAuthProvider();
      let auth;
      try {
        auth = await this.$fireAuth.signInWithPopup(provider);
      } catch {
        return;
      }
      const {
        email,
        family_name: familyName,
        given_name: givenName,
        name,
        picture,
      } = auth.additionalUserInfo.profile;
      const canadian = familyName === 'Easterbrook' || null;
      this.$fireDb.ref(`users/${auth.user.uid}`).update({
        email,
        familyName,
        givenName,
        name,
        picture,
        canadian,
      });
    },
    async logout() {
      await this.$fireAuth.signOut();
      this.$store.commit('user/setUser', null);
    },
  },
};
