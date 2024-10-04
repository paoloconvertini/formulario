import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRicettaDialogComponent } from './dettaglio-ricetta-dialog.component';

describe('DettaglioRicettaDialogComponent', () => {
  let component: DettaglioRicettaDialogComponent;
  let fixture: ComponentFixture<DettaglioRicettaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioRicettaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioRicettaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
