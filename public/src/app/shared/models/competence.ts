import { CYCLES } from './common/enums';
import { Domaine } from './domaine';

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
