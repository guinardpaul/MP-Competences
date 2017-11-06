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
/**
 * routes definition
 */
const routes: Routes = [
  // Auth routes
  { path: 'login', component: LoginComponent, canActivate: [ NotAuthGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AuthGuard ] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [ NotAuthGuard ] },
  { path: 'init-password', component: InitPasswordComponent },
  { path: 'init-password/:_id', component: InitPasswordComponent },
  // default path redirect to 'TODO: A définir'
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // Undefined page path
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
