import { TestBed } from '@angular/core/testing';

import { ProdottiService } from './prodotti.service';

describe('RicetteService', () => {
  let service: ProdottiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdottiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
