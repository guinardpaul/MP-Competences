import { CYCLES } from './common/enums';

export class Competence {
  _id?: number;
  ref_ct: string;
  description_ct: string;
  cycle: string;

  constructor(value: Object = {}) {
    Object.assign(this, value);
  }
}
