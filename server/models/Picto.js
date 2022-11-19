const mongoose = require('mongoose');

let PictoModel = {};

const PictoSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  pictoURL: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PictoSchema.statics.toAPI = (doc) => ({
  pictoURL: doc.pictoURL,
});

PictoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // Convert the string ownerID to an object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return PictoModel.find(search).select('pictoURL').lean().exec(callback);
};

PictoSchema.statics.findAll = (callback) => PictoModel.find().select('pictoURL').lean().exec(callback);

PictoModel = mongoose.model('Picto', PictoSchema);

module.exports = PictoModel;
