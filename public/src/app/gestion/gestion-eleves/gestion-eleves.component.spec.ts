import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionElevesComponent } from './gestion-eleves.component';

describe('GestionElevesComponent', () => {
  let component: GestionElevesComponent;
  let fixture: ComponentFixture<GestionElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
