const format = require('date-fns/format');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password,
  },
});

module.exports = async (personSnapshot, action) => {
  const person = personSnapshot.val();

  const conSnapshot = await personSnapshot.ref.parent.parent.parent.once('value');
  const con = conSnapshot.val();

  const userSnapshot = await admin.database().ref(`users/${personSnapshot.key}`).once('value');
  const user = userSnapshot.val();

  const actionClause = action === 'add' ? 'added to' : 'removed from';
  let roomClause = '';
  let rideClause = '';

  if (action === 'add') {
    const arrivalDay = format(person.dates.arrival, 'EEEE');
    const departureDay = format(person.dates.departure, 'EEEE');
    roomClause = `, for ${arrivalDay} through ${departureDay}`;
    if (person.ride) {
      let rideDirection;
      if (person.ride.to) {
        rideDirection = person.ride.from ? 'to and from' : 'to';
      } else {
        rideDirection = 'from';
      }
      rideClause = `, riding ${rideDirection} the convention`;
    }
  }

  const mailOptions = {
    from: '"Con Room List" <rooms@nikol.ai>',
    to: `"Nikolai Nolan" <${functions.config().gmail.email}>`,
    subject: `${con.name} room update`,
    text: `${user.name} was ${actionClause} the ${con.name} room${roomClause}${rideClause}.`,
  };

  await mailTransport.sendMail(mailOptions);

  return null;
};
