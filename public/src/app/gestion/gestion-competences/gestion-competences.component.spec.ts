import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCompetencesComponent } from './gestion-competences.component';

describe('GestionCompetencesComponent', () => {
  let component: GestionCompetencesComponent;
  let fixture: ComponentFixture<GestionCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
