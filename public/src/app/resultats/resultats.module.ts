import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultatsCompetenceElevesComponent } from './resultats-competence-eleves/resultats-competence-eleves.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    ResultatsCompetenceElevesComponent
  ],
  exports: [
    ResultatsCompetenceElevesComponent
  ]
})
export class ResultatsModule { }
