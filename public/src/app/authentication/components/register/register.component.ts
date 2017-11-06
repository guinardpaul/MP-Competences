import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../services/auth.service';
import { FlashMsgService } from '../../../shared/services/flash-msg.service';
import { ValidationService } from '../../services/validation.service';
// Models
import { User } from '../../models/User';

/**
 * Création Compte utilisateur
 * @author Paul GUINARD
 * @export RegisterComponent
 * @class RegisterComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private user: User;
  private processing: boolean;
  private verifEmailUnicite: boolean;

  private get nom() { return this.registerForm.get('nom').value as string; }
  private get prenom() { return this.registerForm.get('prenom').value as string; }
  private get email() { return this.registerForm.get('email').value as string; }
  private get passwords() { return this.registerForm.controls[ 'passwords' ] as FormControl; }
  private get password() { return this.passwords.get('password').value as string; }
  private get confirmPassword() { return this.passwords.get('confirmPassword').value as string; }

  /**
   * Creates an instance of RegisterComponent.
   * @param {FormBuilder} _fb Reactive Form Builder
   * @param {AuthService} _authService Auth
   * @param {EmailService} _emailService Email
   * @param {FlashMsgService} _flashMsg Flash Msg
   * @param {CompteService} _compteService Compte utilisateur
   * @param {UserService} _userService User service
   * @param {ValidationService} _validationService Validation Form Function
   * @param {Router} _router router
   * @memberof RegisterComponent
   */
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _flashMsg: FlashMsgService,
    private _validationService: ValidationService,
    private _router: Router
  ) {
    this.createForm();
    this.user = new User();
    this.processing = false;
    this.verifEmailUnicite = false;
  }

  /**
   * Generate registerForm
   *
   * @memberof RegisterComponent
   */
  createForm() {
    this.registerForm = this._fb.group({
      nom: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]) ],
      prenom: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100)
      ]) ],
      email: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
        this._validationService.emailValidation
      ]) ],
      passwords: this._fb.group({
        password: [ '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(150)
        ]) ],
        confirmPassword: [ '', Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(150)
        ]) ],
      }, {
          validator: this._validationService.comparePasswords
        })
    });
  }

  /**
   * Get Error message du registerForm en fonction des Validators
   *
   * @param {string} arg current Input
   * @returns {string} Error message
   * @memberof RegisterComponent
   */
  getErrorMessage(arg: string): string {
    switch (arg) {
      case 'nom':
        return this.registerForm.controls[ 'nom' ].hasError('required') ? 'Ce champ est requis' :
          '';

      case 'prenom':
        return this.registerForm.controls[ 'prenom' ].hasError('required') ? 'Ce champ est requis' :
          '';

      case 'email':
        return this.registerForm.controls[ 'email' ].hasError('required') ? 'Ce champ est requis' :
          this.registerForm.controls[ 'email' ].hasError('emailValidation') ? 'Email invalide' :
            '';

      case 'password':
        return this.passwords.get('password').hasError('required') ? 'Ce champ est requis' :
          '';

      case 'confirmPassword':
        return this.passwords.get('confirmPassword').hasError('required') ? 'Ce champ est requis' :
          '';

      case 'passwords':
        return this.passwords.hasError('comparePasswords') ? 'Les mots de passe ne sont pas identiques' :
          '';

      default:
        break;
    }
  }

  /**
   * Register Compte utilisateur function.
   * - Set User Object
   * - Appel function register du authService
   * - Envoi un email de validation on success
   *
   * @memberof RegisterComponent
   */
  onRegister() {
    this.processing = true;
    // Set User Object
    this.user = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
    };

    // Appel function register()
    this._authService.register(this.user)
      .subscribe(data => {
        if (data.success) {
          this._flashMsg.displayMsg('Création de compte réussie', 'alert-success', 3000);
          // Redirection vers login page
          this._router.navigate([ '/login' ]);
        } else {
          this._flashMsg.displayMsg(data.message, 'alert-success', 3000);
        }
      }, err => {
        this.processing = false;
        this._flashMsg.displayMsg('Erreur durant la création de compte. Réessayez plus tard.',
          'alert-danger', 4000);
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
