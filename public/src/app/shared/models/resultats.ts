import { Competence } from './competence';
import { Eleve } from './eleve';

export class Resultats {
  _id?: number;
  competence: Competence;
  eleve: Eleve;
  resultats: {
    result: string;
    value: string;
    updated_at: string;
  };

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
