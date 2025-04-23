import { TestBed } from '@angular/core/testing';
import {MateriaPrimaRegistroWeberService} from "./materia-prima-registro-weber.service";


describe('MateriaPrimaRegistroWeberService', () => {
  let service: MateriaPrimaRegistroWeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaPrimaRegistroWeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
