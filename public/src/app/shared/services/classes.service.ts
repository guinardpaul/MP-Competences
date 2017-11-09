import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Classe } from '../models/classe';

@Injectable()
export class ClassesService {
  url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  getAllClasses(): Observable<any> {
    return this._http.get<Classe>(`${this.url}/classes`);
  }

  getClasseById(id: number): Observable<any> {
    return this._http.get<Classe>(`${this.url}/classes/${id}`);
  }

  getClasseByNom(nom_classe: string): Observable<any> {
    return this._http.get<Classe>(`${this.url}/classes/nom/${nom_classe}`);
  }

  saveClasse(classe: Classe) {
    return this._http.post<Classe>(`${this.url}/classes`, classe);
  }

  updateClasse(classe: Classe) {
    return this._http.put<Classe>(`${this.url}/classes/${classe._id}`, classe);
  }

  deleteClasse(id_classe: number) {
    return this._http.delete<Classe>(`${this.url}/classes/${id_classe}`);
  }
}
