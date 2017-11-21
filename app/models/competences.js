const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const enums = require('./common/enums');
const Domaine = require('./domaines');

/**
 * Competences par cycle défini dans DB (nombre défini et fixe a moins que l'user le modifie)
 */
const competenceSchema = new Schema({
    ref_ct: {
        type: String, // CT X.X
        required: true
    },
    description_ct: {
        type: String, // Description de la CT
        required: true
    },
    cycle: {
        type: String, // Cycle
        required: true,
        enum: enums.CYCLES
    },
    domaine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Domaine',
        required: true
    },
    sous_domaine: {
        type: String
    }
});

module.exports = mongoose.model('Competence', competenceSchema);

/**
 * 2 options : 
 *  - travailler avec 1 seul schema cts qui comprend la ref, l'eleve id et le resultat.
 * pour ne pas surcharger de données inutiles => n'ajoute pas la description a chaque fois mais la retrouve
 * via une enum des cts par cycle
 * 
 * - travailler avec 2 schema:
 *  + cts qui comprend ref(unique), description(unique), eleve id => chaque eleves possèdera un nombre d'obj cts de base
 *  (correspondant au nombre de ct dans le cycle) qui ne changera jamais
 *  et on ajoutera seulement les obj résultats dans la db resultatsCTs qui ref la cts id
 *  + resultatsCts qui comprend le resultat, cts id
 * 
 * ==> - ajouter une table contenant les comp par cycles et faire ref a ces obj dans les results par eleves.
 *      + définition des competences par cycle : ref_ct, description_ct (ajoute la possibilité de modifier les comp par l'utilisateur)
 *      + table : resultatsEleves qui ref id competences : result, value, comp id
 */

/**
 * Afficher liste comp getListComp():Comp []
 * getOneComptByRef(): Comp
 * 
 * Besoin de trouver un moyen d'ajouter le domaine et sous-domaine au changement de compétences ?
 */