import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDistilleryComponent } from './add-edit-distillery.component';

describe('AddEditDistilleryComponent', () => {
  let component: AddEditDistilleryComponent;
  let fixture: ComponentFixture<AddEditDistilleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDistilleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDistilleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
