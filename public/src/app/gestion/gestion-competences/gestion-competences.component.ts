import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
// Models
import { CYCLES } from '../../shared/models/common/enums';
import { Competence } from '../../shared/models/competence';
import { Domaine } from '../../shared/models/domaine';
// Services
import { CompetencesService } from '../../shared/services/competences.service';
import { DomainesService } from '../../shared/services/domaines.service';

@Component({
  selector: 'app-gestion-competences',
  templateUrl: './gestion-competences.component.html',
  styleUrls: [ './gestion-competences.component.css' ]
})
export class GestionCompetencesComponent implements OnInit {
  selectedCycle: string;
  listCycles = CYCLES;
  listCompetences: Observable<Competence[]>;
  listDomaines: Observable<Domaine[]>;
  listCTsWithDomaine = new Array();
  competence: Competence;
  addMode: boolean;
  updateMode: boolean;
  validRefCTUnicite: boolean;
  addCompetenceForm: FormGroup;

  get ref_ct(): string { return this.addCompetenceForm.get('ref_ct').value as string; }
  get description_ct(): string { return this.addCompetenceForm.get('description_ct').value as string; }
  get cycle(): string { return this.addCompetenceForm.get('cycle').value as string; }

  constructor(
    private _competencesService: CompetencesService,
    private _domainesService: DomainesService,
    private _fb: FormBuilder
  ) {
    this.selectedCycle = '';
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
    this.getDomainesByCycle(cycle);
  }

  getDomainesByCycle(cycle: string) {
    if (cycle !== undefined) {
      this._domainesService.getDomainesByCycle(cycle);
      this.listDomaines = this._domainesService.listDomaines;
    }
  }

  getCompetencesByCycle(cycle: string) {
    this._competencesService.getCompetenceByCycle(cycle);
    this.listCompetences = this._competencesService.listCompetences;
  }

  /*  buildListCts(listeCts: Observable<Competence[]>) {
     const listDomainesCts = [];
     let lastDomaine = '';
     // let lastSousDomaine = '';
 
     listeCts.subscribe(data => {
       data.forEach((ct, i) => {
         if (lastDomaine === ct.domaine) {
           listDomainesCts.push(ct);
         } else {
           lastDomaine = ct.domaine;
           listDomainesCts.push(ct.domaine);
         }
       });
     });
     return listDomainesCts;
   } */

  onAdd() {
    this.createForm();
    this.competence = new Competence();
    this.addMode = true;
    this.updateMode = false;
    this.validRefCTUnicite = false;
    this.addCompetenceForm.get('cycle').setValue(this.selectedCycle);
  }

  onUpdate(ct: Competence) {
    this.addMode = false;
    this.updateMode = true;
    this.validRefCTUnicite = false;
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

      this._competencesService.saveCompetence(ct);
    } else {
      const ct = new Competence({
        _id: this.competence._id,
        ref_ct: this.ref_ct,
        description_ct: this.description_ct,
        cycle: this.selectedCycle
      });

      this._competencesService.updateCompetence(ct);
    }
    this.onSuccess();
  }

  getCompetenceToDelete(ct: Competence) {
    this.competence = ct;
  }

  onDelete(ct_id: number) {
    this._competencesService.deleteCompetence(ct_id);
    this.onSuccess();
  }

  onSuccess() {
    this.addMode = false;
    this.updateMode = false;
    this.competence = new Competence();
    this.createForm();
  }

  checkRefUnicite() {
    this.validRefCTUnicite = false;

    if (this.ref_ct !== '' && !this.updateMode) {
      this._competencesService.checkRefUnicite(this.cycle, this.ref_ct)
        .subscribe(data => {
          if (!data.success) {
            this.validRefCTUnicite = true;
          }
        }, err => {
          console.log(err);
        });
    }
  }

  closeForm() {
    this.addMode = false;
    this.updateMode = false;
    this.competence = new Competence();
  }

  closeModal() {
    this.competence = new Competence();
  }

  ngOnInit() {
  }

}
