import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Resultats } from '../models/resultats';

@Injectable()
export class ResultatsElevesService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  getResultatsByCompetence(id_ct: number): Observable<any> {
    return this._http.get<Resultats>(`${this.url}/resultats/competence/${id_ct}`);
  }

  getResultatByEleve(id_eleve: number): Observable<any> {
    return this._http.get<Resultats>(`${this.url}/resultats/eleve/${id_eleve}`);
  }

  getResultatByEleveEtCompetence(id_eleve: number, id_ct: number): Observable<any> {
    return this._http.get<Resultats>(`${this.url}/resultats/eleve/${id_eleve}/competence/${id_ct}`);
  }

  saveResultat(resultat: Resultats) {
    return this._http.post<Resultats>(`${this.url}/resultats`, resultat);
  }

  updateResultat(resultat: Resultats) {
    return this._http.put<Resultats>(`${this.url}/resultats/${resultat._id}`, resultat);
  }

  deleteResultat(id_resultat: number) {
    return this._http.delete<Resultats>(`${this.url}/resultats/${id_resultat}`);
  }
}
