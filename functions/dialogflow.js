const {
  dialogflow,
  BasicCard,
  Image,
  Button,
} = require('actions-on-google');
const capitalize = require('capitalize');
const arrayToSentence = require('array-to-sentence');
const format = require('date-fns/format');
const getMonth = require('date-fns/getMonth');
const getYear = require('date-fns/getYear');
const map = require('lodash/map');
const orderBy = require('lodash/orderBy');

const { db } = require('./admin');

const app = dialogflow({ debug: true });

const dateRange = (start, end) => {
  let date = format(start, 'MMMM d');
  if (getYear(start) !== getYear(end)) {
    date += format(start, ', y');
  }
  date += '–';
  if (getMonth(start) !== getMonth(end)) {
    date += format(end, 'MMMM ');
  }
  date += format(end, 'd, y');
  return date;
};

const dateRangeSpeech = (start, end) => {
  let date = '<say-as interpret-as="date">';
  date += format(start, 'MMMM d');
  if (getYear(start) !== getYear(end)) {
    date += format(start, ', y');
  }
  date += '</say-as><sub alias="through">–</sub><say-as interpret-as="date">';
  if (getMonth(start) !== getMonth(end)) {
    date += format(end, 'MMMM ');
  }
  date += format(end, 'd, y');
  date += '</say-as>';
  return date;
};

app.intent('Get Info', (conv, { con: conName, detail }) => db.ref('cons')
  .orderByChild('name')
  .equalTo(conName)
  .once('value')
  .then((snapshot) => {
    const {
      dates: { start, end },
      city,
      photo,
      room: { suite },
      people,
    } = orderBy(snapshot.val(), 'dates.start', 'desc')[0];

    const roomType = suite ? 'suite' : 'room';
    const peopleNames = people.map(room => map(orderBy(room, ['givenName', 'familyInitial']), 'givenName'));
    const oneRoom = people.length === 1;

    if (detail === 'people') {
      conv.ask(peopleNames.map((roomNames, index) => {
        const verb = roomNames.length === 1 ? 'is' : 'are';
        if (oneRoom) return `${arrayToSentence(roomNames)} ${verb} in the ${roomType}.`;
        return `${arrayToSentence(roomNames)} ${verb} in ${roomType} ${index + 1}.`;
      }).join(' '));
    } else if (detail === 'date') {
      conv.ask(`<speak>${conName} is ${dateRangeSpeech(start, end)}.</speak>`);
    } else if (detail === 'location') {
      conv.ask(`${conName} is in ${city}.`);
    } else conv.ask('Here you go.');

    conv.ask(new BasicCard({
      title: conName,
      subtitle: `${dateRange(start, end)} in ${city}`,
      image: photo && new Image({
        url: photo[640].url,
        alt: `${conName} photo`,
      }),
      display: 'CROPPED',
      text: `<speak>${peopleNames.map((roomNames, index) => {
        if (oneRoom) return roomNames.join(', ');
        return `**${capitalize(roomType)} ${index + 1}:** ${roomNames.join(', ')}`;
      }).join('  \n')}</speak>`,
      buttons: new Button({
        title: 'Open Room List',
        url: 'https://conrooms.com/',
      }),
    }));
  }));

module.exports = app;
