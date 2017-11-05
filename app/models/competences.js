const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const Eleve = require('./eleves');

// ENUMS
const RESULTS = [
  '++',
  '+',
  '+/-',
  '-'
];

const VALUE = [
  1,
  2,
  3,
  4
];

const competenceSchema = new Schema({
  ref_ct: {
    type: String, // CT X.X ou CT_X.X
    required: true,
    unique: true
  },
  // Ou get description de la CT en fonction de la ref et de l'enum ?
  description_ct: {
    type: String, // Description de la CT
    required: true
  },
  resultats: [{
    resultat: {
      type: String,
      enum: RESULTS
    },
    value: {
      type: Number,
      enum: VALUE
    },
    updated_at: {
      type: Date,
      default: new Date()
    }
  }],
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eleve',
    required: true
  }
});

module.exports = mongoose.model('Competence', competenceSchema);