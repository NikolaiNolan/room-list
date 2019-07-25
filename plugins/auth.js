import capitalize from 'capitalize';

const capitalizeName = name => (/[A-Z]/.test(name) ? name : capitalize.words(name));

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
      this.$fireDb.ref(`users/${auth.user.uid}`).update({
        email,
        familyName: capitalizeName(familyName),
        givenName: capitalizeName(givenName),
        name: capitalizeName(name),
        picture,
      });
    },
    async logout() {
      await this.$fireAuth.signOut();
      this.$store.commit('user/setUser', null);
    },
  },
};
