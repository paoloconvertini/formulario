import { TestBed } from '@angular/core/testing';

import { ProdottoMateriePrimeService } from './prodotto-materie-prime.service';

describe('ProdottoMateriePrimeService', () => {
  let service: ProdottoMateriePrimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdottoMateriePrimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
