import { Classe } from './classe';

export class Eleve {
  _id?: number;
  nom: string;
  prenom: string;
  classe: Classe;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
