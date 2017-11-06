const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CTDefaultsSchema = new Schema({
  domaine: [
    {
      titre: {
        type: String,
        required: true,
      },
      sous_domaine: {
        type: String,
      },
      competences: [
        {
          ref: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('CTDefaults', CTDefaultsSchema);