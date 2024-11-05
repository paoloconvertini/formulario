import { TestBed } from '@angular/core/testing';

import { MateriaPrimaRegistroService } from './materia-prima-registro.service';

describe('MateriaPrimaRegistroService', () => {
  let service: MateriaPrimaRegistroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaPrimaRegistroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
