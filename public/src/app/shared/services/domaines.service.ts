import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../../environments/environment';
import { Domaine } from '../models/domaine';
import { FlashMsgService } from './flash-msg.service';

@Injectable()
export class DomainesService {
  private url: string;
  listDomaines: Observable<Domaine[]>;
  private _listDomaines: BehaviorSubject<Domaine[]>;
  private dataStore: { listDomaines: Domaine[] };
  processing: boolean;
  success: boolean;

  constructor(
    private _http: HttpClient,
    private _flashMsg: FlashMsgService
  ) {
    this.url = environment.url;
    this.dataStore = { listDomaines: [] };
    this._listDomaines = <BehaviorSubject<Domaine[]>>new BehaviorSubject([]);
    this.listDomaines = this._listDomaines.asObservable();
    this.processing = false;
  }

  getAllDomaines() {
    return this._http.get<Domaine[]>(`${this.url}/domaines`)
      .subscribe(data => {
        this.dataStore.listDomaines = data;
        this._listDomaines.next(Object.assign({}, this.dataStore).listDomaines);
      }, err => {
        console.log(err);
      });
  }

  getDomainesByCycle(cycle: string) {
    return this._http.get<Domaine[]>(`${this.url}/domaines/cycle/${cycle}`)
      .subscribe(data => {
        this.dataStore.listDomaines = data;
        this._listDomaines.next(Object.assign({}, this.dataStore).listDomaines);
      }, err => {
        console.log(err);
      });
  }

  getOneDomaine(id_domaine: number) {
    return this._http.get<Domaine>(`${this.url}/domaines/${id_domaine}`);
  }

  checkRefUnicite(cycle: string, ref_domaine: string) {
    return this._http.get<any>(`${this.url}/domaines/cycle/${cycle}/ref/${ref_domaine}`);
  }

  saveDomaine(domaine: Domaine) {
    return this._http.post<any>(`${this.url}/domaines`, domaine)
      .subscribe(data => {
        this.dataStore.listDomaines.push(data.obj);
        this._listDomaines.next(Object.assign({}, this.dataStore).listDomaines);
        this._flashMsg.displayMsg('Domaine créé', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur création domaine', 'alert-danger', 3000);
      });
  }

  updateDomaine(domaine: Domaine) {
    return this._http.put<any>(`${this.url}/domaines/${domaine._id}`, domaine)
      .subscribe(data => {
        this.dataStore.listDomaines.forEach((d, i) => {
          if (d._id === data.obj._id) {
            this.dataStore.listDomaines[ i ] = data.obj;
          }
        });
        this._listDomaines.next(Object.assign({}, this.dataStore).listDomaines);
        this._flashMsg.displayMsg('Domaine modifié', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur modification domaine', 'alert-danger', 3000);
      });
  }

  deleteDomaine(id_domaine: number) {
    return this._http.delete<any>(`${this.url}/domaines/${id_domaine}`)
      .subscribe(data => {
        this.dataStore.listDomaines.forEach((d, i) => {
          if (d._id === id_domaine) {
            this.dataStore.listDomaines.splice(i, 1);
          }
        });
        this._listDomaines.next(Object.assign({}, this.dataStore).listDomaines);
        this._flashMsg.displayMsg('Domaine supprimé', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur suppression domaine', 'alert-danger', 3000);
      });
  }

  toggleProcessing() {
    console.log(this.processing);
  }

}
