const models = require('../models');
const AccountModel = require('../models/Account');

const { Account } = models;

const storePage = (req, res) => res.render('store');

const getBorder = (req, res) => AccountModel.findBorderByID(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ border: docs });
});

const getColor = (req, res) => AccountModel.findColorByID(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ color: docs });
});


const setBorder = async (req, res) => {
  try {
    const filter = { _id: req.session.account._id };
    await Account.updateBorder(filter);

    return res.status(200).json({ _id: req.session.account._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
};

const setColor = async (req, res) => {
  try {
    const filter = { _id: req.session.account._id };
    await Account.updateColor(filter);

    return res.status(200).json({ _id: req.session.account._id });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error has occured!' });
  }
};

module.exports = {
  storePage,
  getBorder,
  getColor,
  setBorder,
  setColor,
};
