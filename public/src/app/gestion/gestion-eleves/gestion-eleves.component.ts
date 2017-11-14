import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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
  listEleves: Observable<Eleve[]>;
  eleve: Eleve;
  selectedClasse: Classe;
  objClasse: Classe;
  addMode: boolean;
  updateMode: boolean;
  listClasses: Observable<Classe[]>;
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

  loadElevesByClasse(classe) {
    if (classe === 'undefined') {
      this.selectedClasse = undefined;
    } else {
      this.selectedClasse = classe;
    }
    this.getAllElevesByClasse(classe._id);
    this.addMode = false;
    this.updateMode = false;
  }

  getAllEleves() {
    this._elevesService.getAllEleves();
    this.listEleves = this._elevesService.listEleves;
  }

  getAllElevesByClasse(id_classe: number) {
    if (id_classe !== undefined) {
      this._elevesService.getElevesByClasse(id_classe);
      this.listEleves = this._elevesService.listEleves;
    }
  }

  getAllClasses() {
    this._classesService.getAllClasses();
    this.listClasses = this._classesService.listClasses;
  }

  getClasseById(id_classe: number) {
    this._classesService.getClasseById(id_classe)
      .subscribe(data => {
        this.selectedClasse = data.obj;
        console.log(this.selectedClasse);
      }, err => {
        console.log(err);
      });
  }

  onAdd() {
    this.createForm();
    this.eleve = new Eleve();
    this.addMode = true;
    this.updateMode = false;
    this.addEleveForm.get('classe').setValue(this.selectedClasse.nom_classe);
  }

  onUpdate(eleve: Eleve) {
    this.createForm();
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
    this._elevesService.deleteEleve(eleve_id);
    this.onSuccess();
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

      this._elevesService.saveEleve(eleve);
    } else {
      const eleve = new Eleve({
        nom: this.nom,
        prenom: this.prenom,
        classe: this.objClasse._id
      });

      this._elevesService.updateEleve(eleve);
    }
    this.onSuccess();
  }

  closeForm() {
    this.addMode = false;
    this.updateMode = false;
  }

  onSuccess() {
    this.eleve = new Eleve();
    this.addMode = false;
    this.updateMode = false;
  }

  ngOnInit() {
    // Load Classes pour select
    this.getAllClasses();

    // Load list Eleves si params id
    if (this._activatedRoute.snapshot.params[ 'id' ] !== undefined) {
      this.getClasseById(this._activatedRoute.snapshot.params[ 'id' ]);
      this.getAllElevesByClasse(this._activatedRoute.snapshot.params[ 'id' ]);
    } else {
      this.getAllEleves();
    }
  }

}
