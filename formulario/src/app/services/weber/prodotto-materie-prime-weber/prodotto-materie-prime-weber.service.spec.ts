import { TestBed } from '@angular/core/testing';

import { ProdottoMateriePrimeWeberService } from './prodotto-materie-prime-weber.service';

describe('ProdottoMateriePrimeWeberService', () => {
  let service: ProdottoMateriePrimeWeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdottoMateriePrimeWeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
