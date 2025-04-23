import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMateriaPrimaDialogWeberComponent } from './add-materia-prima-dialog-weber.component';

describe('AddFornitoreDialogComponent', () => {
  let component: AddMateriaPrimaDialogWeberComponent;
  let fixture: ComponentFixture<AddMateriaPrimaDialogWeberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMateriaPrimaDialogWeberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMateriaPrimaDialogWeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
