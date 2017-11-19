import { TestBed, inject } from '@angular/core/testing';

import { DomainesService } from './domaines.service';

describe('DomainesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainesService]
    });
  });

  it('should be created', inject([DomainesService], (service: DomainesService) => {
    expect(service).toBeTruthy();
  }));
});
