import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProdottoWeberComponent } from './tipo-prodotto-weber.component';

describe('TipoProdottoComponent', () => {
  let component: TipoProdottoWeberComponent;
  let fixture: ComponentFixture<TipoProdottoWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProdottoWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProdottoWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
