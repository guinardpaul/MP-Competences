const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const Competence = require('./competences');
const Eleve = require('./eleves');

// ENUMS Validators
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

const resultatsEleveSchema = new Schema({
  resultats: {
    result: {
      type: String,
      required: true,
      enum: RESULTS
    },
    value: {
      type: Number,
      required: true,
      enum: VALUE
    },
    updated_at: {
      type: Date,
      default: new Date()
    }
  },
  competence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competence',
    required: true
  },
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Eleve',
    required: true
  }
});

module.exports = mongoose.model('ResultatsEleve', resultatsEleveSchema);

/**
 * get resultat par comp et eleve id
 * add update delete result => simple ! (vue select classe + comp pour ajouter results eleve par eleve)
 * 
 * probleme: 
 * + vue de toutes les comps par eleves (vue all comp par eleve) :
 * - get resultat par eleve id
 * - puis les ranger par competence auquelle les results sont assignés. 
 * solution : get result par comp et eleve id pour chaque comp du cycle. (boucle for each)
 * + vue de la moyenne des comps par classe
 */