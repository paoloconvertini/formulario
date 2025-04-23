import { TestBed } from '@angular/core/testing';
import {MateriePrimeWeberService} from "./materie-prime-weber.service";


describe('MateriePrimeWeberService', () => {
  let service: MateriePrimeWeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriePrimeWeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
