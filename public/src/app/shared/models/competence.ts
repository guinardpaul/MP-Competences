import { CYCLES } from './common/enums';
import { Domaine } from './domaines';

/**
 * Classe Competence
 *
 * @export
 * @class Competence
 */
export class Competence {
  _id?: number;
  ref_ct: string;
  description_ct: string;
  domaine: Domaine;
  sous_domaine: string;
  cycle: string;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
