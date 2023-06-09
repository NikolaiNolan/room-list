const fetch = require('node-fetch');

const { admin, db } = require('./admin');

module.exports = (req, res) => {
  const lastUpdatedRef = db.ref('config/lastUpdated');

  const updateExchange = () => fetch('https://free.currconv.com/api/v7/convert?q=USD_CAD&compact=ultra&apiKey=3838ecfffe4e6333df54')
    .then(response => response.json())
    .then(({ USD_CAD: exchange }) => db.ref('config').update({ exchange }));

  const updateGasCost = () => fetch('https://gasprices.aaa.com/?state=WI')
    .then(response => response.text())
    .then((response) => {
      let gasCost = response.substr(response.indexOf('Madison'), 1000);
      gasCost = +gasCost.substr(gasCost.indexOf('$') + 1, 5);
      return db.ref('config').update({ gasCost });
    });

  return Promise.all([
    updateExchange(),
    updateGasCost(),
    lastUpdatedRef.set(admin.database.ServerValue.TIMESTAMP),
  ])
    .then(() => {
      if (!res) return;
      res.status(200).end();
    })
    .catch(() => {
      if (!res) return;
      res.status(400).end();
    });
};
