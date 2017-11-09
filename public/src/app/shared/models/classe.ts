export class Classe {
  _id?: number;
  nom_classe: string;
  cycle: string;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
