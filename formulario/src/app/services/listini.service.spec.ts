import { TestBed } from '@angular/core/testing';

import { ListiniService } from './listini.service';

describe('ListiniService', () => {
  let service: ListiniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListiniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
