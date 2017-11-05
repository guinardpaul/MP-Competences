const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const classeSchema = new Schema({
  nom_classe: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Classe', classeSchema);