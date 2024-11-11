import { TestBed } from '@angular/core/testing';

import { TipoProdottoService } from './tipo-prodotto.service';

describe('TipoProdottoService', () => {
  let service: TipoProdottoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoProdottoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
