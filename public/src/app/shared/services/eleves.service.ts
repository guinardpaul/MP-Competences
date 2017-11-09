import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Eleve } from '../models/eleve';

@Injectable()
export class ElevesService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  getAllEleves(): Observable<any> {
    return this._http.get<Eleve>(`${this.url}/eleves`);
  }

  getEleveById(id: number): Observable<any> {
    return this._http.get<Eleve>(`${this.url}/eleves/${id}`);
  }

  getElevesByClasse(id_classe: number): Observable<any> {
    return this._http.get<Eleve>(`${this.url}/eleves/classe/${id_classe}`);
  }

  saveEleve(eleve: Eleve) {
    return this._http.post<Eleve>(`${this.url}/eleves`, eleve);
  }

  updateEleve(eleve: Eleve) {
    return this._http.put<Eleve>(`${this.url}/eleves/${eleve._id}`, eleve);
  }

  deleteEleve(id_eleve: number) {
    return this._http.delete<Eleve>(`${this.url}/eleves/${id_eleve}`);
  }
}
