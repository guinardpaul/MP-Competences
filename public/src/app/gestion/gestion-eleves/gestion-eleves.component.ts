import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ElevesService } from '../../shared/services/eleves.service';
import { ClassesService } from '../../shared/services/classes.service';
import { Eleve } from '../../shared/models/eleve';
import { Classe } from '../../shared/models/classe';

@Component({
  selector: 'app-gestion-eleves',
  templateUrl: './gestion-eleves.component.html',
  styleUrls: [ './gestion-eleves.component.css' ]
})
export class GestionElevesComponent implements OnInit {
  listEleves: Eleve[];
  eleve: Eleve;
  selectedClasse: Classe;
  objClasse: Classe;
  addMode: boolean;
  updateMode: boolean;
  listClasses: Classe[];
  addEleveForm: FormGroup;

  get nom(): string { return this.addEleveForm.get('nom').value as string; }
  get prenom(): string { return this.addEleveForm.get('prenom').value as string; }
  get classe(): string { return this.addEleveForm.get('classe').value as string; }

  constructor(
    private _elevesService: ElevesService,
    private _classesService: ClassesService,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.listEleves = [];
    this.eleve = new Eleve();
    this.objClasse = new Classe();
    this.addMode = false;
    this.updateMode = false;
    this.createForm();
  }

  createForm() {
    this.addEleveForm = this._fb.group({
      nom: [ '', Validators.compose([
        Validators.required
      ]) ],
      prenom: [ '', Validators.compose([
        Validators.required
      ]) ],
      classe: [ { value: '', disabled: true }, Validators.compose([
        Validators.required
      ]) ]
    });
  }

  getAllEleves() {
    this.listEleves = [];
    this._elevesService.getAllEleves()
      .subscribe(data => {
        this.listEleves = data.obj;
      }, err => {
        console.log(err);
      });
  }

  getAllElevesByClasse(id_classe: number) {
    this.listEleves = [];
    this._elevesService.getElevesByClasse(id_classe)
      .subscribe(data => {
        this.listEleves = data.obj;
      }, err => {
        console.log(err);
      });
  }

  getAllClasses() {
    this.listClasses = [];
    this._classesService.getAllClasses()
      .subscribe(data => {
        this.listClasses = data.obj;
      }, err => {
        console.log(err);
      });
  }

  getClasseById(id_classe: number) {
    this._classesService.getClasseById(id_classe)
      .subscribe(data => {
        this.objClasse = data.obj;
      }, err => {
        console.log(err);
      });
  }

  loadElevesByClasse(classe: Classe) {
    this.selectedClasse = classe;
    this.getAllElevesByClasse(classe._id);
  }

  onAdd() {
    this.addMode = true;
    this.updateMode = false;
    this.addEleveForm.get('classe').setValue(this.selectedClasse.nom_classe);
  }

  onUpdate(eleve: Eleve) {
    this.eleve = eleve;
    this.addEleveForm.get('nom').setValue(eleve.nom);
    this.addEleveForm.get('prenom').setValue(eleve.prenom);
    this.addEleveForm.get('classe').setValue(this.selectedClasse.nom_classe);
    this.addMode = false;
    this.updateMode = true;
  }

  getEleveToDelete(eleve: Eleve) {
    this.eleve = eleve;
  }

  onDelete(eleve_id: number) {
    this._elevesService.deleteEleve(eleve_id)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  closeModal() {
    this.eleve = new Eleve();
  }

  addOrUpdateEleve() {
    if (this.eleve._id === undefined) {
      const eleve = new Eleve({
        nom: this.nom,
        prenom: this.prenom,
        classe: this.objClasse._id
      });

      this._elevesService.saveEleve(eleve)
        .subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        });
    } else {
      const eleve = new Eleve({
        nom: this.nom,
        prenom: this.prenom,
        classe: this.objClasse._id
      });

      this._elevesService.updateEleve(eleve)
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
    // Load Classes pour select
    this.getAllClasses();

    // Load list Eleves
    /* if (this._activatedRoute.snapshot.params[ 'id' ] !== undefined) {
      this.getAllElevesByClasse(this._activatedRoute.snapshot.params[ 'id' ]);
      this.getClasseById(this._activatedRoute.snapshot.params[ 'id' ]);
    } else {
      this.getAllEleves();
    } */
  }

}
