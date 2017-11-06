import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Service
import { AuthService } from '../../authentication/services/auth.service';

/**
 * NavBar
 * @author Paul GUINARD
 * @export NavbarComponent
 * @class NavbarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {

  /**
   * Creates an instance of NavbarComponent.
   * @param {AuthService} _authService authentication
   * @param {Router} _router router
   * @memberof NavbarComponent
   */
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  /**
   * On Logout :
   * - clear token and user on localStorage
   * - navigate HomePage
   * @memberof NavbarComponent
   */
  onLogout() {
    this._authService.clearLocalStorage();
    this._router.navigate([ '/' ]);
  }

  ngOnInit() {
  }

}
