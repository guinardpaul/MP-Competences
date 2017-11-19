import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Guards
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
// Components
import { LoginComponent } from '../authentication/components/login/login.component';
import { RegisterComponent } from '../authentication/components/register/register.component';
import { ForgotPasswordComponent } from '../authentication/components/forgot-password/forgot-password.component';
import { InitPasswordComponent } from '../authentication/components/init-password/init-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GestionClassesComponent } from '../gestion/gestion-classes/gestion-classes.component';
import { GestionElevesComponent } from '../gestion/gestion-eleves/gestion-eleves.component';
import { GestionCompetencesComponent } from '../gestion/gestion-competences/gestion-competences.component';
import { ResultatsCompetenceElevesComponent } from '../resultats/resultats-competence-eleves/resultats-competence-eleves.component';

/**
 * routes definition
 */
const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [ AuthGuard ] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ NotAuthGuard ] },
  { path: 'init-password', component: InitPasswordComponent },
  { path: 'init-password/:_id', component: InitPasswordComponent },
  // Gestion path
  { path: 'gestion-classes', component: GestionClassesComponent, canActivate: [ AuthGuard ] },
  { path: 'gestion-eleves', component: GestionElevesComponent, canActivate: [ AuthGuard ] },
  { path: 'gestion-eleves/:id', component: GestionElevesComponent, canActivate: [ AuthGuard ] },
  { path: 'gestion-competences', component: GestionCompetencesComponent, canActivate: [ AuthGuard ] },
  // Résultats élèves path
  { path: 'resultats-competences', component: ResultatsCompetenceElevesComponent, canActivate: [ AuthGuard ] },
  // default path redirect to 'TODO: A définir'
  { path: '', redirectTo: 'gestion-classes', pathMatch: 'full' },
  // Undefined page path
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
