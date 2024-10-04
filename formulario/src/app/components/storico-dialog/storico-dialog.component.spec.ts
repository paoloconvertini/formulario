import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoricoDialogComponent } from './storico-dialog.component';

describe('StoricoDialogComponent', () => {
  let component: StoricoDialogComponent;
  let fixture: ComponentFixture<StoricoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoricoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoricoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
