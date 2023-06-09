const functions = require('firebase-functions');

const dialogflow = require('./dialogflow');
const mailNotification = require('./mailNotification');
const updateVariables = require('./updateVariables');

module.exports = {
  updateVariables: functions.https.onRequest(updateVariables),
  scheduledUpdateVariables: functions.pubsub.schedule('every day 09:00').onRun(updateVariables),
  dialogflow: functions.https.onRequest(dialogflow),
  mailNotificationOnAdd: functions.database.ref('cons/{conId}/people/{roomId}/{personId}').onCreate(snapshot => mailNotification(snapshot, 'add')),
  mailNotificationOnRemove: functions.database.ref('cons/{conId}/people/{roomId}/{personId}').onDelete(snapshot => mailNotification(snapshot, 'remove')),
};
