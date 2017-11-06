import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
// Models
import { User } from '../models/User';
// Environments
import { environment } from '../../../environments/environment';
/**
 * Authentication Service
 * @author Paul GUINARD
 * @export AuthService
 * @class AuthService
 */
@Injectable()
export class AuthService {
  private url: string;
  private authToken: string;
  private authHeaders: HttpHeaders;

  /**
   * Creates an instance of AuthService.
   * @param {HttpClient} _http httpClient
   * @memberof AuthService
   */
  constructor(
    private _http: HttpClient
  ) {
    this.url = environment.url;
  }

  /**
   * Store token et user in localStorage
   *
   * @param {string} token token
   * @param {User} user User Object
   * @memberof AuthService
   */
  storeUserData(token: string) {
    localStorage.setItem('token', token);
  }

  /**
   * Login User
   *
   * @param {User} user User Object
   * @memberof AuthService
   */
  login(user: User): Observable<any> {
    return this._http.post(`${this.url}/auth/login`, user);
  }

  /**
   * Register User
   *
   * @param {User} user User Object
   * @memberof AuthService
   */
  register(user: User): Observable<any> {
    return this._http.post(`${this.url}/auth/register`, user);
  }

  /**
   * Clear le localStorage
   *
   * @memberof AuthService
   */
  clearLocalStorage() {
    localStorage.clear();
  }
  /**
   * Get User object by Email
   *
   * @param {string} email user email
   * @memberof AuthService
   */
  getUserByEmail(email: string): Observable<any> {
    return this._http.get(`${this.url}/auth/users/email/${email}`);
  }

  /**
   * Get User Object by Id
   *
   * @param {number} id User id
   * @memberof AuthService
   */
  getUserById(id: number): Observable<any> {
    return this._http.get(`${this.url}/auth/users/${id}`);
  }

  /**
   * Init User password
   *
   * @param {User} user User object
   * @memberof AuthService
   */
  initUserPassword(user: User): Observable<any> {
    return this._http.put(`${this.url}/auth/init-password/${user._id}`, user);
  }

  /**
   * Vérifie si token dans localStorage et tokenNotExpired
   *
   * @returns {boolean} tokenNotExpired
   * @memberof AuthService
   */
  loggedIn(): boolean {
    return tokenNotExpired();
  }

}
