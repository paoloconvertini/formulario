import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoProdottoComponent } from './tipo-prodotto.component';

describe('TipoProdottoComponent', () => {
  let component: TipoProdottoComponent;
  let fixture: ComponentFixture<TipoProdottoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoProdottoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
