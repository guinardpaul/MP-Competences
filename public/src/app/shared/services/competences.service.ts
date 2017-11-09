import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Competence } from '../models/competence';

@Injectable()
export class CompetencesService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  getAllCompetences(): Observable<any> {
    return this._http.get<Competence>(`${this.url}/competences`);
  }

  getCompetenceByCycle(cycle: string): Observable<any> {
    return this._http.get<Competence>(`${this.url}/competences/cycle/${cycle}`);
  }

  getCompetenceByRefCT(ref_ct: string): Observable<any> {
    return this._http.get<Competence>(`${this.url}/competences/ref/${ref_ct}`);
  }

  saveCompetence(competence: Competence) {
    return this._http.post<Competence>(`${this.url}/competences`, competence);
  }

  updateCompetence(competence: Competence) {
    return this._http.put<Competence>(`${this.url}/competences/${competence._id}`, competence);
  }

  deleteCompetence(id_competence: number) {
    return this._http.delete<Competence>(`${this.url}/competences/${id_competence}`);
  }
}
