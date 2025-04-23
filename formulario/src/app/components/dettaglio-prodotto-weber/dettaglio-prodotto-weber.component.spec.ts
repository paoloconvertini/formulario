import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioProdottoWeberComponent } from './dettaglio-prodotto-weber.component';

describe('DettaglioRicettaComponent', () => {
  let component: DettaglioProdottoWeberComponent;
  let fixture: ComponentFixture<DettaglioProdottoWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioProdottoWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioProdottoWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
