import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { Classe } from '../models/classe';
import { FlashMsgService } from './flash-msg.service';

@Injectable()
export class ClassesService {
  private url: string;
  listClasses: Observable<Classe[]>;
  private _listClasses: BehaviorSubject<Classe[]>;
  private dataStore: { listClasses: Classe[] };

  constructor(
    private _http: HttpClient,
    private _flashMsg: FlashMsgService
  ) {
    this.url = environment.url;
    this.dataStore = { listClasses: [] };
    this._listClasses = <BehaviorSubject<Classe[]>>new BehaviorSubject([]);
    this.listClasses = this._listClasses.asObservable();
  }

  getAllClasses() {
    return this._http.get<Classe[]>(`${this.url}/classes`)
      .subscribe(data => {
        this.dataStore.listClasses = data;
        this._listClasses.next(Object.assign({}, this.dataStore).listClasses);
      }, err => {
        console.log(err);
      });
  }

  getClasseById(id: number): Observable<any> {
    return this._http.get<Classe>(`${this.url}/classes/${id}`);
  }

  getClasseByNom(nom_classe: string): Observable<any> {
    return this._http.get<Classe>(`${this.url}/classes/nom/${nom_classe}`);
  }

  saveClasse(classe: Classe) {
    return this._http.post<any>(`${this.url}/classes`, classe)
      .subscribe(data => {
        this.dataStore.listClasses.push(data.obj);
        this._listClasses.next(Object.assign({}, this.dataStore).listClasses);
        this._flashMsg.displayMsg('Classe créée', 'alert-success', 3000);
      }, err => {
        this._flashMsg.displayMsg('Erreur création classe', 'alert-danger', 3000);
        console.log(err);
      });
  }

  updateClasse(classe: Classe) {
    return this._http.put<any>(`${this.url}/classes/${classe._id}`, classe)
      .subscribe(data => {
        this.dataStore.listClasses.forEach((c, i) => {
          if (c._id === data.obj._id) {
            this.dataStore.listClasses[ i ] = data.obj;
          }
        });
        this._listClasses.next(Object.assign({}, this.dataStore).listClasses);
        this._flashMsg.displayMsg('Classe modifiée', 'alert-success', 3000);
      }, err => {
        this._flashMsg.displayMsg('Erreur modification classe', 'alert-danger', 3000);
        console.log(err);
      });
  }

  deleteClasse(id_classe: number) {
    return this._http.delete<any>(`${this.url}/classes/${id_classe}`)
      .subscribe(response => {
        this.dataStore.listClasses.forEach((c, i) => {
          if (c._id === id_classe) {
            this.dataStore.listClasses.splice(i, 1);
          }
        });
        this._listClasses.next(Object.assign({}, this.dataStore).listClasses);
        this._flashMsg.displayMsg('Classe supprimée', 'alert-warning', 3000);
      }, err => {
        this._flashMsg.displayMsg('Erreur suppression classe', 'alert-danger', 3000);
        console.log(err);
      });
  }
}
