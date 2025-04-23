import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioProdottoDialogWeberComponent } from './dettaglio-prodotto-dialog-weber.component';

describe('DettaglioRicettaDialogComponent', () => {
  let component: DettaglioProdottoDialogWeberComponent;
  let fixture: ComponentFixture<DettaglioProdottoDialogWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioProdottoDialogWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioProdottoDialogWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
