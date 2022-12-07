const models = require('../models');
const AcountModel = require('../models/Account');

const { Account } = models;

// Render's store page
const storePage = (req, res) => res.render('store');

// Get request to return borderPurchased boolean
const getBorder = (req, res) => AcountModel.findBorderByID(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ border: docs });
});

// Get request to return colorPurchased boolean
const getColor = (req, res) => AcountModel.findColorByID(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ color: docs });
});

// Updates the borderPurchased boolean to true
// This is the only time it is used, if it isn't I'll find you
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

// Updates the colorPurchased boolean to true
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
