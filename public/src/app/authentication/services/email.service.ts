import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// Models
import { Email } from '../models/Email';
import { environment } from '../../../environments/environment';
/**
 * Service pour envoyer des Email
 * @author Paul GUINARD
 * @export EmailService
 * @class EmailService
 */
@Injectable()
export class EmailService {
  private url: string;

  /**
   * Creates an instance of EmailService.
   * @param {HttpClient} _http httpClient
   * @memberof EmailService
   */
  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  /**
   * Fonction pour envoyer un Email au compte utilisateur
   *
   * @param {Email} email Email Object
   * @returns {Observable<any>}
   * @memberof EmailService
   */
  sendMail(email: Email): Observable<any> {
    return this._http.post(`${this.url}/mail/sendMail`, email);
  }

}
