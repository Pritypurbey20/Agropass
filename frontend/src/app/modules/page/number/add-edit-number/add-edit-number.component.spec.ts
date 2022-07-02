import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNumberComponent } from './add-edit-number.component';

describe('AddEditNumberComponent', () => {
  let component: AddEditNumberComponent;
  let fixture: ComponentFixture<AddEditNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
