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
  domaine: Domaine;
  selectedDomaine: Domaine;
  addCTsMode: boolean;
  updateCTsMode: boolean;
  addDomaineMode: boolean;
  updateDomaineMode: boolean;
  validRefCTUnicite: boolean;
  validRefDomaineUnicite: boolean;
  competenceForm: FormGroup;
  domaineForm: FormGroup;

  get ref_ct(): string { return this.competenceForm.get('ref_ct').value as string; }
  get description_ct(): string { return this.competenceForm.get('description_ct').value as string; }
  get domaine_ct(): string { return this.competenceForm.get('domaine').value as string; }
  /* set ref_ct(ref_ct) { this.competenceForm.get('ref_ct').setValue(ref_ct); }
  set description_ct(description_ct) { this.competenceForm.get('description_ct').setValue(description_ct); }
  set domaine_ct(domaine_ct) { this.competenceForm.get('domaine').setValue(domaine_ct); }
 */
  get ref_domaine(): string { return this.domaineForm.get('ref_domaine').value as string; }
  get description_domaine(): string { return this.domaineForm.get('description_domaine').value as string; }
  get cycle_domaine(): string { return this.domaineForm.get('cycle').value as string; }
  /*  set ref_domaine(ref_domaine: string) { this.domaineForm.get('ref_domaine').setValue(ref_domaine); }
   set description_domaine(description_domaine: string) { this.domaineForm.get('description_domaine').setValue(description_domaine); }
   set cycle_domaine(cycle_domaine: string) { this.domaineForm.get('cycle_domaine').setValue(cycle_domaine); }
  */
  constructor(
    private _competencesService: CompetencesService,
    private _domainesService: DomainesService,
    private _fb: FormBuilder
  ) {
    this.selectedCycle = '';
    this.addCTsMode = false;
    this.updateCTsMode = false;
    this.addDomaineMode = false;
    this.updateDomaineMode = false;
    this.competence = new Competence();
    this.domaine = new Domaine();
    this.createCompetenceForm();
    this.createDomaineForm();
  }

  createCompetenceForm() {
    this.competenceForm = this._fb.group({
      ref_ct: [ '', Validators.compose([
        Validators.required
      ]) ],
      description_ct: [ '', Validators.compose([
        Validators.required
      ]) ],
      domaine: [ { value: '', disabled: true }, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  createDomaineForm() {
    this.domaineForm = this._fb.group({
      ref_domaine: [ '', Validators.compose([
        Validators.required
      ]) ],
      description_domaine: [ '', Validators.compose([
        Validators.required
      ]) ],
      cycle: [ { value: '', disabled: true }, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  loadCycle(cycle) {
    this.selectedCycle = cycle;
    this.domaineForm.get('cycle').setValue(cycle);
    this.getDomainesByCycle(cycle);

    this.selectedDomaine = undefined;
  }

  onSelectDomaine(domaine: Domaine) {
    this.selectedDomaine = domaine;
    this.getCompetencesByDomaine(domaine._id);
  }

  getDomainesByCycle(cycle: string) {
    if (cycle !== undefined && cycle !== '') {
      this._domainesService.getDomainesByCycle(cycle);
      this.listDomaines = this._domainesService.listDomaines;
    }
  }

  getCompetencesByDomaine(domaine_id: number) {
    this._competencesService.getCompetenceByDomaine(domaine_id);
    this.listCompetences = this._competencesService.listCompetences;
  }

  onAddCompetence() {
    this.addCTsMode = true;
    this.updateCTsMode = false;
    this.competence = new Competence();
    this.competenceForm.get('domaine').setValue(this.selectedDomaine.ref_domaine);
  }

  onAddDomaine() {
    this.createDomaineForm();
    this.addDomaineMode = true;
    this.updateDomaineMode = false;
    this.domaineForm.get('cycle').setValue(this.selectedCycle);
  }

  onUpdateCompetence(ct: Competence) {
    this.addCTsMode = false;
    this.updateCTsMode = true;
    this.addDomaineMode = false;
    this.updateDomaineMode = false;
    this.validRefCTUnicite = false;
    this.competenceForm.get('ref_ct').setValue(ct.ref_ct);
    this.competenceForm.get('description_ct').setValue(ct.description_ct);
    this.competenceForm.get('domaine').setValue(this.selectedDomaine.ref_domaine);
    this.competence = ct;
  }

  onUpdateDomaine(domaine: Domaine) {
    this.addCTsMode = false;
    this.updateCTsMode = false;
    this.addDomaineMode = false;
    this.updateDomaineMode = true;
    this.domaine = domaine;
    this.domaineForm.get('ref_domaine').setValue(domaine.ref_domaine);
    this.domaineForm.get('description_domaine').setValue(domaine.description_domaine);
    this.domaineForm.get('cycle').setValue(domaine.cycle);
  }

  addOrUpdateCompetence() {
    if (this.competence._id === undefined) {
      const ct = new Competence({
        ref_ct: this.ref_ct,
        description_ct: this.description_ct,
        cycle: this.selectedCycle,
        domaine: this.selectedDomaine._id
      });

      this._competencesService.saveCompetence(ct);
    } else {
      const ct = new Competence({
        _id: this.competence._id,
        ref_ct: this.ref_ct,
        description_ct: this.description_ct,
        cycle: this.selectedCycle,
        domaine: this.selectedDomaine._id
      });

      this._competencesService.updateCompetence(ct);
    }
    this.onSuccess();
  }

  addOrUpdateDomaine() {
    if (this.domaine._id === undefined) {
      const domaine = new Domaine({
        ref_domaine: this.ref_domaine,
        description_domaine: this.description_domaine,
        cycle: this.cycle_domaine
      });
      console.log(domaine);
      this._domainesService.saveDomaine(domaine);
      // this.onSuccess();
    } else {
      const domaine = new Domaine({
        _id: this.domaine._id,
        ref_domaine: this.ref_domaine,
        description_domaine: this.description_domaine,
        cycle: this.cycle_domaine
      });

      this._domainesService.updateDomaine(domaine);
      // this.onSuccess();
    }
  }

  getCompetenceToDelete(ct: Competence) {
    this.competence = ct;
  }

  getDomaineToDelete(domaine: Domaine) {
    this.domaine = domaine;
  }

  onDeleteCompetence(ct_id: number) {
    this._competencesService.deleteCompetence(ct_id);
    this.onSuccess();
  }

  onDeleteDomaine(domaine_id: number) {
    this._domainesService.deleteDomaine(domaine_id);
    this.onSuccess();
  }

  onSuccess() {
    this.addCTsMode = false;
    this.updateCTsMode = false;
    this.addDomaineMode = false;
    this.updateDomaineMode = false;
    this.domaine = new Domaine();
    this.competence = new Competence();
    this.createCompetenceForm();
    this.createDomaineForm();
  }

  checkRefCompetenceUnicite() {
    this.validRefCTUnicite = false;

    if (this.ref_ct !== '' && !this.updateCTsMode) {
      this._competencesService.checkRefUnicite(this.selectedCycle, this.ref_ct)
        .subscribe(data => {
          if (!data.success) {
            this.validRefCTUnicite = true;
          }
        }, err => {
          console.log(err);
        });
    }
  }

  checkRefDomaineUnicite() {
    this.validRefDomaineUnicite = false;

    if (this.ref_domaine !== '' && !this.updateDomaineMode) {
      this._domainesService.checkRefUnicite(this.cycle_domaine, this.ref_domaine)
        .subscribe(data => {
          if (!data.success) {
            this.validRefDomaineUnicite = true;
          }
        }, err => {
          console.log(err);
        });
    }
  }

  closeForm() {
    this.addCTsMode = false;
    this.updateCTsMode = false;
    this.addDomaineMode = false;
    this.updateDomaineMode = false;
    this.domaine = new Domaine();
    this.competence = new Competence();
  }

  closeModal() {
    this.competence = new Competence();
    this.domaine = new Domaine();
  }

  ngOnInit() {
  }

}
