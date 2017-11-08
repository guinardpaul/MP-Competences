import { TestBed, inject } from '@angular/core/testing';

import { ElevesService } from './eleves.service';

describe('ElevesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElevesService]
    });
  });

  it('should be created', inject([ElevesService], (service: ElevesService) => {
    expect(service).toBeTruthy();
  }));
});
