const models = require('../models');
const PictoModel = require('../models/Picto');

const { Picto } = models;

const makerPage = (req, res) => res.render('app');
const communityPage = (req, res) => res.render('community');

const makePicto = async (req, res) => {
  if (!req.body.pictoURL) {
    return res.status(400).json({ error: 'An error has occured!' });
  }

  const pictoData = {
    owner: req.session.account._id,
    pictoURL: req.body.pictoURL,
  };

  try {
    const newPicto = new Picto(pictoData);
    await newPicto.save();

    return res.status(201).json({ pictoURL: newPicto.pictoURL });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Picto already exists!' });
    }
    return res.status(400).json({ error: 'An error occured. Skill issue!' });
  }
};

const getPictos = (req, res) => PictoModel.findByOwner(req.session.account._id, (err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ pictos: docs });
});

const getAll = (req, res) => PictoModel.findAll((err, docs) => {
  if (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured! ' });
  }

  return res.json({ pictos: docs });
});

module.exports = {
  makerPage,
  communityPage,
  makePicto,
  getPictos,
  getAll,
};
