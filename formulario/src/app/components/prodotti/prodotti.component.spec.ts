import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiComponent } from './prodotti.component';

describe('RicetteComponent', () => {
  let component: ProdottiComponent;
  let fixture: ComponentFixture<ProdottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdottiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
