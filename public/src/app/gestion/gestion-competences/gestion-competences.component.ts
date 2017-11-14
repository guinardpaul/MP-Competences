import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// Models
import { CYCLES } from '../../shared/models/common/enums';
import { Competence } from '../../shared/models/competence';
// Services
import { CompetencesService } from '../../shared/services/competences.service';

@Component({
  selector: 'app-gestion-competences',
  templateUrl: './gestion-competences.component.html',
  styleUrls: [ './gestion-competences.component.css' ]
})
export class GestionCompetencesComponent implements OnInit {
  selectedCycle: string;
  listCycles = CYCLES;
  listCompetences: Competence[];
  competence: Competence;
  addMode: boolean;
  updateMode: boolean;
  addCompetenceForm: FormGroup;

  get ref_ct(): string { return this.addCompetenceForm.get('ref_ct').value as string; }
  get description_ct(): string { return this.addCompetenceForm.get('description_ct').value as string; }
  get cycle(): string { return this.addCompetenceForm.get('cycle').value as string; }

  constructor(
    private _competencesService: CompetencesService,
    private _fb: FormBuilder
  ) {
    this.selectedCycle = '';
    this.listCompetences = [];
    this.addMode = false;
    this.updateMode = false;
    this.competence = new Competence();
    this.createForm();
  }

  createForm() {
    this.addCompetenceForm = this._fb.group({
      ref_ct: [ '', Validators.compose([
        Validators.required
      ]) ],
      description_ct: [ '', Validators.compose([
        Validators.required
      ]) ],
      cycle: [ { value: '', disabled: true }, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  loadCycle(cycle) {
    this.selectedCycle = cycle;
    this.addCompetenceForm.get('cycle').setValue(cycle);
    this.getCompetencesByCycle(cycle);
  }

  getCompetencesByCycle(cycle: string) {
    this.listCompetences = [];
    this._competencesService.getCompetenceByCycle(cycle)
      .subscribe(data => {
        this.listCompetences = data.obj;
      }, err => {
        console.log(err);
      });
  }

  onAdd() {
    this.addMode = true;
    this.updateMode = false;
    this.addCompetenceForm.get('cycle').setValue(this.selectedCycle);
  }

  onUpdate(ct: Competence) {
    this.addMode = false;
    this.updateMode = true;
    this.addCompetenceForm.get('ref_ct').setValue(ct.ref_ct);
    this.addCompetenceForm.get('description_ct').setValue(ct.description_ct);
    this.addCompetenceForm.get('cycle').setValue(ct.cycle);
    this.competence = ct;
  }

  addOrUpdateCompetence() {
    if (this.competence._id === undefined) {
      const ct = new Competence({
        ref_ct: this.ref_ct,
        description_ct: this.description_ct,
        cycle: this.selectedCycle
      });

      this._competencesService.saveCompetence(ct)
        .subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
    } else {
      const ct = new Competence({
        ref_ct: this.ref_ct,
        description_ct: this.description_ct,
        cycle: this.selectedCycle
      });

      this._competencesService.updateCompetence(ct)
        .subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }

  getCompetenceToDelete(ct: Competence) {
    this.competence = ct;
  }

  onDelete(ct_id: number) {
    this._competencesService.deleteCompetence(ct_id)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  closeForm() {
    this.addMode = false;
    this.updateMode = false;
  }

  closeModal() {
    this.competence = new Competence();
  }

  ngOnInit() {
  }

}
