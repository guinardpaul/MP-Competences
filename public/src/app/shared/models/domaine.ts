/**
 * Classe Domaine
 *
 * @export
 * @class Domaine
 */
export class Domaine {
  _id?: number;
  ref_domaine: string;
  description_domaine: string;
  cycle: string;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
