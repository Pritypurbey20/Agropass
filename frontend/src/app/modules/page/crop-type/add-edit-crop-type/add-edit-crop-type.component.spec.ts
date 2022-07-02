import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCropTypeComponent } from './add-edit-crop-type.component';

describe('AddEditCropTypeComponent', () => {
  let component: AddEditCropTypeComponent;
  let fixture: ComponentFixture<AddEditCropTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCropTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCropTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
