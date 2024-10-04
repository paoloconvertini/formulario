import { TestBed } from '@angular/core/testing';

import { MateriePrimeService } from './materie-prime.service';

describe('MateriePrimeService', () => {
  let service: MateriePrimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriePrimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
