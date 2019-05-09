const functions = require('firebase-functions');

const updateVariables = require('./updateVariables');

module.exports = {
  updateVariables: functions.https.onRequest(updateVariables),
  scheduledUpdateVariables: functions.pubsub.schedule('every day 04:00').timeZone('America/Chicago').onRun(updateVariables),
};
