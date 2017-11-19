import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// Components
import { GestionElevesComponent } from './gestion-eleves/gestion-eleves.component';
import { GestionClassesComponent } from './gestion-classes/gestion-classes.component';
import { GestionCompetencesComponent } from './gestion-competences/gestion-competences.component';
import { MaterialModule } from '../shared/material.module';
// Pipes
import { SortByStringPipe } from '../shared/pipes/sort-by-string.pipe';
import { SortByRefCtPipe } from '../shared/pipes/sort-by-ref-ct.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    GestionClassesComponent,
    GestionCompetencesComponent,
    GestionElevesComponent,
    SortByStringPipe,
    SortByRefCtPipe
  ],
  exports: [
    GestionClassesComponent,
    GestionCompetencesComponent,
    GestionElevesComponent
  ]
})
export class GestionModule { }
