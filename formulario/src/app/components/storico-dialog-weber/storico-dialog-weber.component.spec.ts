import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoDialogWeberComponent } from './storico-dialog-weber.component';

describe('StoricoDialogComponent', () => {
  let component: StoricoDialogWeberComponent;
  let fixture: ComponentFixture<StoricoDialogWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoDialogWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoDialogWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
