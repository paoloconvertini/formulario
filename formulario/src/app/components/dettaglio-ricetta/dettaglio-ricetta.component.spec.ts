import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRicettaComponent } from './dettaglio-ricetta.component';

describe('DettaglioRicettaComponent', () => {
  let component: DettaglioRicettaComponent;
  let fixture: ComponentFixture<DettaglioRicettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioRicettaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DettaglioRicettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
