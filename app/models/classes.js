const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const enums = require('./common/enums');

const classeSchema = new Schema({
    nom_classe: {
        type: String,
        required: true,
        unique: true
    },
    cycle: {
        type: String,
        required: true,
        enum: enums.CYCLES
    }
});

module.exports = mongoose.model('Classe', classeSchema);