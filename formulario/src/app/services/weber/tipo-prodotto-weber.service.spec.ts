import { TestBed } from '@angular/core/testing';

import { TipoProdottoWeberService } from './tipo-prodotto-weber.service';

describe('TipoProdottoWeberService', () => {
  let service: TipoProdottoWeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProdottoWeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
