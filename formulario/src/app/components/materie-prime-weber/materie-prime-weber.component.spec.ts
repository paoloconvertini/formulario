import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriePrimeComponent } from './materie-prime.component';

describe('MateriePrimeComponent', () => {
  let component: MateriePrimeComponent;
  let fixture: ComponentFixture<MateriePrimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriePrimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriePrimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
