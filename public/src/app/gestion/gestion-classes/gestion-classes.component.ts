import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ClassesService } from '../../shared/services/classes.service';
import { Classe } from '../../shared/models/classe';
import { CYCLES } from '../../shared/models/common/enums';

@Component({
  selector: 'app-gestion-classes',
  templateUrl: './gestion-classes.component.html',
  styleUrls: [ './gestion-classes.component.css' ]
})
export class GestionClassesComponent implements OnInit {
  listClasses: Classe[];
  classe: Classe;
  selectedCycle: string;
  addMode: boolean;
  updateMode: boolean;
  listCycles = CYCLES;
  addClasseForm: FormGroup;

  get nom_classe(): string { return this.addClasseForm.get('nom_classe').value as string; }
  get cycle(): string { return this.addClasseForm.get('cycle').value as string; }

  constructor(
    private _classesService: ClassesService,
    private _fb: FormBuilder
  ) {
    this.listClasses = [];
    this.classe = new Classe();
    this.selectedCycle = '';
    this.addMode = false;
    this.updateMode = false;
    this.createForm();
  }

  createForm() {
    this.addClasseForm = this._fb.group({
      nom_classe: [ '', Validators.compose([
        Validators.required
      ]) ],
      cycle: [ '', Validators.compose([
        Validators.required
      ]) ]
    });
  }

  loadCycle(cycle) {
    this.selectedCycle = cycle;
    this.addClasseForm.get('cycle').setValue(this.selectedCycle);
  }

  getAllClasses() {
    this._classesService.getAllClasses()
      .subscribe(data => {
        this.listClasses = data.obj;
      }, err => {
        console.log(err);
      });
  }

  onUpdate(classe: Classe) {
    this.classe = classe;
    this.selectedCycle = classe.cycle;
    this.addClasseForm.get('nom_classe').setValue(classe.nom_classe);
    this.addClasseForm.get('cycle').setValue(classe.cycle);
    this.addMode = false;
    this.updateMode = true;
  }

  getClasseToDelete(classe: Classe) {
    this.classe = classe;
  }

  onDelete(classe_id: number) {
    this._classesService.deleteClasse(classe_id)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  closeModal() {
    this.classe = new Classe();
  }

  onAdd() {
    this.addMode = true;
    this.updateMode = false;
  }

  addOrUpdateClasse() {
    if (this.classe._id === undefined) {
      const classe = new Classe({
        nom_classe: this.nom_classe,
        cycle: this.cycle
      });

      this._classesService.saveClasse(classe)
        .subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
    } else {
      const classe = new Classe({
        _id: this.classe._id,
        nom_classe: this.nom_classe,
        cycle: this.cycle
      });

      this._classesService.updateClasse(classe)
        .subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
    }
  }

  closeForm() {
    this.addMode = false;
    this.updateMode = false;
  }

  ngOnInit() {
    this.getAllClasses();
  }

}
