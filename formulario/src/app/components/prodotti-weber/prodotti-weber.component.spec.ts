import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiWeberComponent } from './prodotti-weber.component';

describe('RicetteComponent', () => {
  let component: ProdottiWeberComponent;
  let fixture: ComponentFixture<ProdottiWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdottiWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdottiWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
