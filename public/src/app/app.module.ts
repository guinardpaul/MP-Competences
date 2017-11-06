import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // TODO: A enlever quand component main-page aura son propre module **
// Modules
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthModule } from './authentication/auth.module';
import { MaterialModule } from './shared/material.module';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './routing/navbar/navbar.component';
import { PageNotFoundComponent } from './routing/page-not-found/page-not-found.component';
// Services
import { AuthService } from './authentication/services/auth.service';
import { FlashMsgService } from './shared/services/flash-msg.service';
import { EmailService } from './authentication/services/email.service';
import { ValidationService } from './authentication/services/validation.service';
// Guards
import { AuthGuard } from './routing/guards/auth.guard';
import { NotAuthGuard } from './routing/guards/not-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    AuthModule,
    FlashMessagesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FlashMsgService,
    AuthService,
    AuthGuard,
    NotAuthGuard,
    EmailService,
    ValidationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
