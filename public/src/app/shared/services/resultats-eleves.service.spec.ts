import { TestBed, inject } from '@angular/core/testing';

import { ResultatsElevesService } from './resultats-eleves.service';

describe('ResultatsElevesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultatsElevesService]
    });
  });

  it('should be created', inject([ResultatsElevesService], (service: ResultatsElevesService) => {
    expect(service).toBeTruthy();
  }));
});
