export const actions = { // eslint-disable-line import/prefer-default-export
  async add(context, {
    conId,
    roomId,
    personId,
    options,
  }) {
    const userSnapshot = await this.$fireDb.ref(`users/${personId}`).once('value');
    const { familyName = null, givenName = null, picture = null } = userSnapshot.val();
    this.$fireDb.ref(`cons/${conId}/people/${roomId}/${personId}`).update({
      givenName,
      familyInitial: familyName ? familyName[0] : null,
      picture,
      ...options,
    });
  },
  async move({ rootState }, { conId, fromRoomId, toRoomId }) {
    const personId = rootState.user.user.id;
    const userSnapshot = await this.$fireDb.ref(`cons/${conId}/people/${fromRoomId}/${personId}`).once('value');
    const options = userSnapshot.val();
    this.$fireDb.ref(`cons/${conId}/people/${toRoomId}/${personId}`).update(options);
    this.$fireDb.ref(`cons/${conId}/people/${fromRoomId}/${personId}`).remove();
  },
  remove(context, { conId, roomId, personId }) {
    this.$fireDb.ref(`cons/${conId}/people/${roomId}/${personId}`).remove();
  },
  setPaid(context, {
    conId,
    roomId,
    personId,
    paid,
  }) {
    this.$fireDb.ref(`cons/${conId}/people/${roomId}/${personId}`).update({ paid: paid || null });
  },
};
