const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const CYCLES = require('./common/enums');

/**
 * Domaines faisant ref à une compétence
 */
const domainesSchema = new Schema({
  ref_domaine: {
    type: String, // D X.X
    required: true
  },
  description_domaine: {
    type: String, // Description domaine
    required: true
  },
  cycle: {
    type: String,
    required: true,
    enum: CYCLES
  }
});

module.exports = mongoose.model('Domaine', domainesSchema);
