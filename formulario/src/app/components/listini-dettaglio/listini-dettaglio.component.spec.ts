import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListiniDettaglioComponent } from './listini-dettaglio.component';

describe('ListiniDettaglioComponent', () => {
  let component: ListiniDettaglioComponent;
  let fixture: ComponentFixture<ListiniDettaglioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListiniDettaglioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListiniDettaglioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
