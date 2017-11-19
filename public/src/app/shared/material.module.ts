import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatRadioModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule
  ],
  exports: [
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatTableModule
  ]
})
export class MaterialModule { }
