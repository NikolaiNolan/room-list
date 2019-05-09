const fetch = require('node-fetch');

const { admin, db } = require('./admin');

module.exports = (req, res) => {
  const lastUpdatedRef = db.ref('config/lastUpdated');

  const updateExchange = () => fetch('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=aa63e4f0196ce0b0a865')
    .then(response => response.json())
    .then(({ USD_CAD: exchange }) => db.ref('config').update({ exchange }));

  const updateGasCost = () => fetch('https://gasprices.aaa.com/?state=WI')
    .then(response => response.text())
    .then((response) => {
      let gasCost = response.substr(response.indexOf('Madison'), 1000);
      gasCost = +gasCost.substr(gasCost.indexOf('$') + 1, 5);
      return db.ref('config').update({ gasCost });
    });

  return lastUpdatedRef.once('value')
    .then((lastUpdatedSnapshot) => {
      if (Date.now() < lastUpdatedSnapshot.val() + (24 * 60 * 60 * 1000)) return false;

      return Promise.all([
        updateExchange(),
        updateGasCost(),
        lastUpdatedRef.set(admin.database.ServerValue.TIMESTAMP),
      ]);
    })
    .then(() => res.status(200).end())
    .catch(() => res.status(400).end());
};
