import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioProdottoDialogComponent } from './dettaglio-prodotto-dialog.component';

describe('DettaglioRicettaDialogComponent', () => {
  let component: DettaglioProdottoDialogComponent;
  let fixture: ComponentFixture<DettaglioProdottoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioProdottoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioProdottoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
