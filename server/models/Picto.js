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
  borderColor: {
    type: String,
    default: "black",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PictoSchema.statics.toAPI = (doc) => ({
  pictoURL: doc.pictoURL,
  borderColor: doc.borderColor,
});

PictoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // Convert the string ownerID to an object id
    owner: mongoose.Types.ObjectId(ownerId),
  };

  return PictoModel.find(search).select('pictoURL borderColor').lean().exec(callback);
};

PictoSchema.statics.findAll = (callback) => PictoModel.find().select('pictoURL borderColor').lean().exec(callback);

PictoModel = mongoose.model('Picto', PictoSchema);

module.exports = PictoModel;
