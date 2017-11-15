import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../../environments/environment';
import { Competence } from '../models/competence';
import { FlashMsgService } from '../../shared/services/flash-msg.service';

@Injectable()
export class CompetencesService {
  private url: string;
  listCompetences: Observable<Competence[]>;
  private _listCompetences: BehaviorSubject<Competence[]>;
  private dataStore: { listCompetences: Competence[] };

  constructor(
    private _http: HttpClient,
    private _flashMsg: FlashMsgService
  ) {
    this.url = environment.url;
    this.dataStore = { listCompetences: [] };
    this._listCompetences = <BehaviorSubject<Competence[]>>new BehaviorSubject([]);
    this.listCompetences = this._listCompetences.asObservable();
  }

  getAllCompetences() {
    return this._http.get<Competence[]>(`${this.url}/competences`)
      .subscribe(data => {
        this.dataStore.listCompetences = data;
        this._listCompetences.next(Object.assign({}, this.dataStore).listCompetences);
      }, err => {
        console.log(err);
      });
  }

  getCompetenceByCycle(cycle: string) {
    return this._http.get<Competence[]>(`${this.url}/competences/cycle/${cycle}`)
      .subscribe(data => {
        this.dataStore.listCompetences = data;
        this._listCompetences.next(Object.assign({}, this.dataStore).listCompetences);
      }, err => {
        console.log(err);
      });
  }

  getCompetenceByRefCT(ref_ct: string): Observable<any> {
    return this._http.get<Competence>(`${this.url}/competences/ref/${ref_ct}`);
  }

  saveCompetence(competence: Competence) {
    return this._http.post<any>(`${this.url}/competences`, competence)
      .subscribe(data => {
        this.dataStore.listCompetences.push(data.obj);
        this._listCompetences.next(Object.assign({}, this.dataStore).listCompetences);
        this._flashMsg.displayMsg('Compétence créée', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur création compétence', 'alert-danger', 3000);
      });
  }

  updateCompetence(competence: Competence) {
    return this._http.put<any>(`${this.url}/competences/${competence._id}`, competence)
      .subscribe(data => {
        this.dataStore.listCompetences.forEach((ct, i) => {
          if (ct._id === data.obj._id) {
            this.dataStore.listCompetences[ i ] = data.obj;
          }
        });
        this._listCompetences.next(Object.assign({}, this.dataStore).listCompetences);
        this._flashMsg.displayMsg('Compétence modifiée', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur modification compétence', 'alert-danger', 3000);
      });
  }

  deleteCompetence(id_competence: number) {
    return this._http.delete<any>(`${this.url}/competences/${id_competence}`)
      .subscribe(response => {
        this.dataStore.listCompetences.forEach((ct, i) => {
          if (ct._id === id_competence) {
            this.dataStore.listCompetences.splice(i, 1);
          }
        });
        this._listCompetences.next(Object.assign({}, this.dataStore).listCompetences);
        this._flashMsg.displayMsg('Compétence modifiée', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur modification compétence', 'alert-danger', 3000);
      });
  }

  checkRefUnicite(cycle: string, ref_ct: string) {
    return this._http.get<any>(`${this.url}/competences/cycle/${cycle}/ref/${ref_ct}`);
  }
}
