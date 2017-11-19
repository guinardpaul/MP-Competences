import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatsCompetenceElevesComponent } from './resultats-competence-eleves.component';

describe('ResultatsCompetenceElevesComponent', () => {
  let component: ResultatsCompetenceElevesComponent;
  let fixture: ComponentFixture<ResultatsCompetenceElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatsCompetenceElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatsCompetenceElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
