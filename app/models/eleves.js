const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const Classe = require('./classes');

const eleveSchema = new Schema({
    nom: {
        type: String,
        required: true,
        uppercase: true
    },
    prenom: {
        type: String,
        required: true
    },
    classe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    }
});

module.exports = mongoose.model('Eleve', eleveSchema);