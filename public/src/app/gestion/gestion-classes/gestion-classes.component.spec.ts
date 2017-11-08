import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClassesComponent } from './gestion-classes.component';

describe('GestionClassesComponent', () => {
  let component: GestionClassesComponent;
  let fixture: ComponentFixture<GestionClassesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionClassesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
