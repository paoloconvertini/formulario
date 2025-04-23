import { TestBed } from '@angular/core/testing';
import {ProdottiWeberService} from "./prodotti-weber.service";


describe('ProdottiWeberService', () => {
  let service: ProdottiWeberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdottiWeberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
