import { TestBed } from '@angular/core/testing';

import { RicetteService } from './ricette.service';

describe('RicetteService', () => {
  let service: RicetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
