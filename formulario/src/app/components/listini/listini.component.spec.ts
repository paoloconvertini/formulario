import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListiniComponent } from './listini.component';

describe('ListiniComponent', () => {
  let component: ListiniComponent;
  let fixture: ComponentFixture<ListiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
