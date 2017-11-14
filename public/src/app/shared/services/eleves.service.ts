import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { Eleve } from '../models/eleve';
import { FlashMsgService } from './flash-msg.service';

@Injectable()
export class ElevesService {
  private url: string;
  listEleves: Observable<Eleve[]>;
  private _listEleves: BehaviorSubject<Eleve[]>;
  private dataStore: { listEleves: Eleve[] };

  constructor(
    private _http: HttpClient,
    private _flashMsg: FlashMsgService
  ) {
    this.url = environment.url;
    this.dataStore = { listEleves: [] };
    this._listEleves = <BehaviorSubject<Eleve[]>>new BehaviorSubject([]);
    this.listEleves = this._listEleves.asObservable();
  }

  getAllEleves() {
    return this._http.get<Eleve[]>(`${this.url}/eleves`)
      .subscribe(data => {
        this.dataStore.listEleves = data;
        this._listEleves.next(Object.assign({}, this.dataStore).listEleves);
      }, err => {
        console.log(err);
      });
  }

  getEleveById(id: number): Observable<any> {
    return this._http.get<Eleve>(`${this.url}/eleves/${id}`);
  }

  getElevesByClasse(id_classe: number) {
    return this._http.get<Eleve[]>(`${this.url}/eleves/classe/${id_classe}`)
      .subscribe(data => {
        this.dataStore.listEleves = data;
        this._listEleves.next(Object.assign({}, this.dataStore).listEleves);
      }, err => {
        console.log(err);
      });
  }

  saveEleve(eleve: Eleve) {
    return this._http.post<any>(`${this.url}/eleves`, eleve)
      .subscribe(data => {
        this.dataStore.listEleves.push(data.obj);
        this._listEleves.next(Object.assign({}, this.dataStore).listEleves);
        this._flashMsg.displayMsg('Elève créé', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur création élève', 'alert-danger', 3000);
      });
  }

  updateEleve(eleve: Eleve) {
    return this._http.put<any>(`${this.url}/eleves/${eleve._id}`, eleve)
      .subscribe(data => {
        this.dataStore.listEleves.forEach((e, i) => {
          if (e._id === data.obj._id) {
            this.dataStore.listEleves[ i ] = data.obj;
          }
        });
        this._listEleves.next(Object.assign({}, this.dataStore).listEleves);
        this._flashMsg.displayMsg('Elève modifié', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur modification élève', 'alert-danger', 3000);
      });
  }

  deleteEleve(id_eleve: number) {
    return this._http.delete<Eleve>(`${this.url}/eleves/${id_eleve}`)
      .subscribe(response => {
        this.dataStore.listEleves.forEach((e, i) => {
          if (e._id === id_eleve) {
            this.dataStore.listEleves.splice(i, 1);
          }
        });
        this._listEleves.next(Object.assign({}, this.dataStore).listEleves);
        this._flashMsg.displayMsg('Elève supprimé', 'alert-success', 3000);
      }, err => {
        console.log(err);
        this._flashMsg.displayMsg('Erreur suppression élève', 'alert-danger', 3000);
      });
  }

}
