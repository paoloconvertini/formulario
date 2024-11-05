import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMateriaPrimaDialogComponent } from './add-materia-prima-dialog.component';

describe('AddFornitoreDialogComponent', () => {
  let component: AddMateriaPrimaDialogComponent;
  let fixture: ComponentFixture<AddMateriaPrimaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMateriaPrimaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMateriaPrimaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
